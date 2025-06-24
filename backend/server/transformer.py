from backend.models.Game import PlayerGame
from backend.server.requests import Server
from backend.models.Player import Player

############################## PLAYER TRANSFORMATIONS ##############################
def get_all_players_transformed():
    """
    fetches all players from the server and transforms them into a list of Player objects.
    """
    player_list = Server.get_player_list()
    return player_list

def get_player_by_name_transformed(name):
    """
    fetches a player by name from the server and transforms it into a Player object.
    :param name: the name of the player to fetch.
    :return: a Player object if found, otherwise None.
    """
    player_data = Server.get_player_info(player_name=name)
    player = Player(player_data)
    return player.to_dict()

def get_player_by_id_transformed(player_id):
    """
    fetches a player by ID from the server and transforms it into a Player object.

    :param player_id: the ID of the player to fetch.
    :return: a Player object if found, otherwise None.
    """
    player_data = Server.get_player_info(player_id=player_id)
    player = Player(player_data)
    return player.to_dict()

def get_player_game_stats_transformed(player_id, season):
    """
    fetches player game stats for a specific player and season from the server. includes all games played in the regular
    season and playoffs. handles bye weeks and injuries by inserting appropriate entries in the game list.

    :param player_id: the ID of the player to fetch stats for.
    :param season: the season year for which to fetch the stats.
    :return: a Player object with stats if found, otherwise None.
    """
    # 1. fetches game data for all games that a player PLAYED IN (bye weeks and injuries are not included)
    response = Server.get_nfl_games_and_stats_for_player(player_id=player_id, season_year=season)

    # 2. transforms the fetched data into a Player object
    game_dict = response["body"]
    rev_player_games = []
    for game_id, stats in game_dict.items():  # this does yield reversed order of games, so the first game is the most recent
        game = PlayerGame(game_id, {}, stats)  # uses special constructor to intake dict as value
        rev_player_games.append(game)

    # at this point, rev_player_games is a list of PlayerGame objects, each representing a game played by player
    # 3. extract team_id and player_name from the first game in the list
    team_id = rev_player_games[0].team_id if rev_player_games else None
    player_name = rev_player_games[0].player_name if rev_player_games else None

    # 4. fetches the team schedule for the given team_id and season
    team_games = (Server.get_nfl_team_schedule(team_id, 2024))["body"]["schedule"]
    # copies the player games in reverse order to maintain the order of games as they were played

    player_games = rev_player_games[::-1]

    json_games = []

    player_game_count = 0  # essentially a pointer for the player games
    last_week = 0  # necessary to track the last week played to determine bye weeks

    # 4. iterates through the team games and compares them with the player games to determine if a bye week or injury occurred
    for idx in range(len(team_games)):
        game = team_games[idx]
        if game.get("seasonType") == "Preseason":
            # at the moment, we do not support preseason games
            continue
        game = team_games[idx] # unnecessary ?

        week = (game.get("gameWeek"))[-1]
        if week.isdigit():
            week = int(week)

        if str(week).isdigit() and week - last_week > 1:
            # if this condition is met, it means there was a bye week
            json_games.append(PlayerGame("Bye", {},{
                "playerID": player_id,
                "longName": player_name,
                "season": season,
                "teamID": team_id,
                "teamAbv": None,
                "fantasyPointsDefault": None,
                "snapCounts": {},
                "Defense": {},
                "Receiving": {},
                "Rushing": {},
                "Passing": {}
            }).to_dict())
        if game.get("gameID") != player_games[player_game_count].game_id:
            # if this condition is met, it means the player did not play in this game (injury or otherwise)
            json_games.append(PlayerGame(game.get("gameID"), game, {
                "playerID": player_id,
                "longName": player_name,
                "season": season,
                "teamID": team_id,
                "teamAbv": game.get("teamAbv"),
                "fantasyPointsDefault": 0,
                "snapCounts": {},
                "Defense": {},
                "Receiving": {},
                "Rushing": {},
                "Passing": {}
            }).to_dict())
        else:
            # if this condition is met, it means the player played in this game
            player_games[player_game_count].load_data(game)
            json_games.append(player_games[player_game_count].to_dict())
            player_game_count += 1
        last_week = week

    return {"games": json_games, "playerId": player_id, "season": season}

############################### TEAM TRANSFORMATIONS ###############################