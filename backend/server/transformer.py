from backend.server.requests import Server
from backend.models.Player import Player

############################## PLAYER TRANSFORMATIONS ##############################
def get_all_players_transformed():
    """
    Fetches all players from the server and transforms them into a list of Player objects.
    """
    player_list = Server.get_player_list()
    return player_list

def get_player_by_name_transformed(name):
    """
    Fetches a player by name from the server and transforms it into a Player object.
    :param name: The name of the player to fetch.
    :return: A Player object if found, otherwise None.
    """
    player_data = Server.get_player_info(player_name=name)
    player = Player(player_data)
    return player.to_dict()

def get_player_by_id_transformed(player_id):
    """
    Fetches a player by ID from the server and transforms it into a Player object.

    :param player_id: The ID of the player to fetch.
    :return: A Player object if found, otherwise None.
    """
    player_data = Server.get_player_info(player_id=player_id)
    player = Player(player_data)
    return player.to_dict()

def get_player_game_stats_transformed(player_id, season):
    """
    Fetches player game stats for a specific player and season from the server. Includes all games played in the regular
    season and playoffs.

    :param player_id: The ID of the player to fetch stats for.
    :param season: The season year for which to fetch the stats.
    :return: A Player object with stats if found, otherwise None.
    """
    # 1. fetches game data for all games that a player PLAYED IN (bye weeks and injuries are not included)
    player_data = Server.get_nfl_games_and_stats_for_player(player_id=player_id, season_year=season)
    # 2. transforms the fetched data into Player object
    # 3. compares games in a Player object with games played by the team in the same season add a blank for a bye week and a 0 for injury
    # 4.
    return player_data

############################### TEAM TRANSFORMATIONS ###############################