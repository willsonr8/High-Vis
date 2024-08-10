from flask import Blueprint, jsonify
from ..API import APICalls

player_bp = Blueprint('player', __name__)


@player_bp.route('/player_name/<player_name>', methods=['GET'])
def get_player(player_name):
    player = APICalls.get_player_info(player_name)  # player is a dict
    return jsonify({"player": player})


@player_bp.route('/player_id/JohnDoe', methods=['GET'])
def get_johndoe():
    return jsonify({"player_name": "JohnDoe"})


@player_bp.route('/test', methods=['GET'])
def test():
    return "Test Passed"
