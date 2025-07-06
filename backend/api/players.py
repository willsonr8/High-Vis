from flask import Blueprint, jsonify

import backend.server.transformer as tf
# from ..app import cache

player_bp = Blueprint('player', __name__)

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

