import ordered_set

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
    season and playoffs. handles bye weeks and injuries by inserting appropriate entries in the game list. handles
    player trades by iterating through all teams that the player played for in the season.

    :param player_id: the ID of the player to fetch stats for.
    :param season: the season year for which to fetch the stats.
    :return: a Player object with stats if found, otherwise None.
    """
    # 1. fetches game data for all games that a player PLAYED IN (bye weeks and injuries are not included)
    response = Server.get_nfl_games_and_stats_for_player(player_id=player_id, season_year=season)

    # 2. transforms the fetched data into a Player object. extracts all team ids that the player played for in the season
    game_dict = response["body"]
    rev_player_games = []
    all_team_ids = ordered_set.OrderedSet()
    for game_id, stats in game_dict.items():  # this does yield reversed order of games, so the first game is the most recent
        game = PlayerGame(game_id, {}, stats)  # uses special constructor to intake dict as value
        rev_player_games.append(game)
        all_team_ids.add(game.team_id)  # the first id in the list is the most recent team played for by the player

    # at this point, rev_player_games is a list of PlayerGame objects, each representing a game played by player
    # 3. extract player_name from the first game in the list

    player_name = rev_player_games[0].player_name if rev_player_games else None

    # 4. fetches the team schedule for all given team_ids and season
    all_team_games = dict()
    for team_id in all_team_ids:
        team_games = (Server.get_nfl_team_schedule(team_id, season))["body"]["schedule"]
        all_team_games[team_id] = team_games

    player_games = rev_player_games[::-1] # copies the player games in reverse order to maintain the order of games as they were played

    json_games = []

    player_game_count = 0  # essentially a pointer for the player games
    last_week = 0  # necessary to track the last week played to determine bye weeks

    # 4. iterates through the team games and compares them with the player games to determine if a bye week or injury occurred
    team_id = all_team_ids[-1]  # starts with the first team that a player played for in the season which is at the end of the list
    team_games = all_team_games[all_team_ids[-1]]

    idx = 0
    team_game_number = len(team_games)
    while idx < team_game_number:
        game = team_games[idx]

        if team_id != player_games[player_game_count].team_id:  # indicates that a player has been traded
            # updates iteration variables to reflect the new team
            team_id = player_games[player_game_count].team_id
            team_games = all_team_games[team_id]
            team_game_number = len(team_games)
            continue

        if game.get("seasonType") == "Preseason":
            # at the moment, we do not support preseason games
            idx += 1
            continue

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
        idx += 1

    return {"games": json_games, "playerId": player_id, "season": season}

############################### TEAM TRANSFORMATIONS ###############################

def get_all_nfl_teams_transformed(sort_by="standings", rosters=False, schedules=False, top_performers=True, team_stats=True, team_stats_season=2024):
    """
    fetches all NFL teams from the server and transforms them into a list of Team objects.

    :param sort_by: the attribute to sort the teams by.
    :param rosters: whether to include rosters in the response.
    :param schedules: whether to include schedules in the response.
    :param top_performers: whether to include top performers in the response.
    :param team_stats: whether to include team stats in the response.
    :param team_stats_season: the season for which to fetch team stats.
    :return: a list of Team objects.
    """
    teams = Server.get_nfl_teams(sort_by, rosters, schedules, top_performers, team_stats, team_stats_season)
    return teams

def get_nfl_team_schedule_transformed(team_id, season=2024):
    """
    fetches the NFL team schedule for a specific team and season from the server.

    :param team_id: the ID of the team to fetch the schedule for.
    :param season: the season year for which to fetch the schedule.
    :return: a list of games in the team's schedule.
    """
    team_data = Server.get_nfl_team_schedule(team_id, season)
    return team_data["body"]["schedule"]