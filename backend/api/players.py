from flask import Blueprint, jsonify

from ..Server import Server
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


@player_bp.route('/player_id/JohnDoe', methods=['GET'])
def get_johndoe():
    return jsonify({"player_name": "JohnDoe"})


@player_bp.route('/test', methods=['GET'])
def test():
    return "Test Passed"
