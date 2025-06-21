from flask import Blueprint, jsonify

import backend.server.transformer as tf
# from ..app import cache

player_bp = Blueprint('player', __name__)

# @player_bp.route('/all_players', methods=['GET'])
# #@cache.cached(timeout=60 * 10)
# def get_player_list():
#     player_list = Server.get_all_players()
#     return jsonify({"player_list": player_list})
#
#
# @player_bp.route('/player_name/<player_name>', methods=['GET'])
# #@cache.cached(timeout=60 * 10)
# def get_player(player_name):
#     player = Server.get_player_info(player_name)
#     return jsonify({"player": player})
#
#
# @player_bp.route('/player_stats/<player_id>/<team>/2024', methods=['GET'])
# #@cache.cached(timeout=60 * 10)
# def get_fantasy_stats_2024(player_id, team, year="2024"):
#     if not player_id or not team:
#         return jsonify({"error": "player_id and team are required"}), 400
#     player_stats = Server.get_fantasy_info(player_id, team, year)
#     print(year, player_stats)
#     return jsonify({"player_stats": player_stats})
#
#
# @player_bp.route('/player_stats/<player_id>/<team>/2023', methods=['GET'])
# #@cache.cached(timeout=60 * 10)
# def get_fantasy_stats_2023(player_id, team, year="2023"):
#     if not player_id or not team:
#         return jsonify({"error": "player_id and team are required"}), 400
#     player_stats = Server.get_fantasy_info(player_id, team, year)
#     print(year, player_stats)
#     return jsonify({"player_stats": player_stats})
#
#
# @player_bp.route('/team/schedule/<team_abbrev>', methods=['GET'])
# def get_schedule(team_abbrev):
#     schedule = Server.get_team_schedule(team_abbrev)
#     return jsonify({"team schedule": schedule})

############################## TEST ROUTES ##############################

@player_bp.route('/player_id/JohnDoe', methods=['GET'])
def get_johndoe():
    return jsonify({"player_name": "JohnDoe"})


@player_bp.route('/test', methods=['GET'])
def test():
    return "Test Passed"

############################## PLAYER ROUTES ##############################

@player_bp.route('/all_players', methods=['GET'])
def get_all_players():
    # This is a placeholder for the actual implementation
    player_list = tf.get_all_players_transformed()
    return jsonify(player_list)

@player_bp.route('/name/<player_name>', methods=['GET'])
# this should probably return basic player info and return id. id should be used for all other requests. if possible, route to player_id endpoint
def get_player_by_name(player_name):
    player = tf.get_player_by_name_transformed(player_name)
    return jsonify({"player": player})

@player_bp.route('/id/<player_id>', methods=['GET'])
# return all player information available
def get_player_by_id(player_id):
    player = tf.get_player_by_id_transformed(player_id)
    return jsonify({"player": player})

@player_bp.route('/id/<player_id>/player_stats/<year>', methods=['GET'])
def get_player_game_stats(player_id, year):
    player_stats = tf.get_player_game_stats_transformed(player_id, year)
    return jsonify(player_stats)

