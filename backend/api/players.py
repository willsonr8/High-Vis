from flask import Blueprint, jsonify, request
from ..API import APICalls
from ..app import cache

player_bp = Blueprint('player', __name__)


@player_bp.route('/all_players', methods=['GET'])
@cache.cached(timeout=60 * 10)
def get_player_list():
    player_list = APICalls.get_all_players()
    return jsonify({"player_list": player_list})


@player_bp.route('/player_name/<player_name>', methods=['GET'])
@cache.cached(timeout=60 * 10)
def get_player(player_name):
    player = APICalls.get_player_info(player_name)
    return jsonify({"player": player})


@player_bp.route('/player_stats/<player_id>/<team>', methods=['GET'])
@cache.cached(timeout=60 * 10)
def get_fantasy_stats(player_id, team):
    if not player_id or not team:
        return jsonify({"error": "player_id and team are required"}), 400
    player_stats = APICalls.get_fantasy_info(player_id, team)
    return jsonify({"player_stats": player_stats})


@player_bp.route('/team/schedule/<team_abbrev>', methods=['GET'])
def get_schedule(team_abbrev):
    schedule = APICalls.get_team_schedule(team_abbrev)
    return jsonify({"team schedule": schedule})


@player_bp.route('/player_id/JohnDoe', methods=['GET'])
def get_johndoe():
    return jsonify({"player_name": "JohnDoe"})


@player_bp.route('/test', methods=['GET'])
def test():
    return "Test Passed"
