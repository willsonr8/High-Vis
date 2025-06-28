from flask import Blueprint, jsonify

import backend.server.transformer as tf

team_bp = Blueprint("team", __name__)

@team_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"team_name": "The Test Team"})

@team_bp.route("/all_teams/<season>", methods=["GET"])
def get_all_teams(sort_by="standings", rosters=False, schedules=False, top_performers=True, team_stats=True, season=2024):
    teams = tf.get_all_nfl_teams_transformed(sort_by, rosters, schedules, top_performers, team_stats, season)
    return jsonify(teams)

