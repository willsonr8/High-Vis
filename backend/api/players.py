from flask import Blueprint, jsonify
from ..API import APICalls

player_bp = Blueprint('player', __name__)


@player_bp.route('/player_id/<player_name>', methods=['GET'])
def get_player_id(player_name):
    try:
        player = APICalls.get_player_info(player_name) # player is a dict

        # Check if player is a dictionary and provide a detailed error message
        if isinstance(player, dict):
            if 'espnID' not in player:
                return jsonify({
                    "error": f"Key 'espnID' not found in the player data. Available keys: {list(player.keys())}"
                }), 400
            else:
                player_id = player['espnID']
        else:
            # Assuming player is an object with espnID as an attribute
            player_id = player.espnID
    except AttributeError as e:
        return jsonify({
            "error": f"Attribute error: {str(e)}. The player object might be a dict: {player_name}"
        }), 500

    return jsonify({"player_ID": player_id})


@player_bp.route('/player_id/JohnDoe', methods=['GET'])
def get_johndoe():
    return jsonify({"player_name": "JohnDoe"})


@player_bp.route('/test', methods=['GET'])
def test():
    return "Test Passed"
