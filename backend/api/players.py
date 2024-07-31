from flask import Blueprint, jsonify
from ..API import APICalls

player_bp = Blueprint('player', __name__)


@player_bp.route('/player_id/<player_name>', methods=['GET'])
def get_player_id(player_name):
    player = APICalls.get_player_info(player_name)
    return jsonify({"player_ID": player.espnID})


@player_bp.route('/player/<player_name>', methods=['GET'])
def test(player_name):
    return "Test Passed"
