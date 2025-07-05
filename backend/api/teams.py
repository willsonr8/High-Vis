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

@team_bp.route("/team_id/<team_id>/<season>/schedule", methods=["GET"])
def get_team_schedule_by_id(team_id, season=2024):
    team_schedule = tf.get_nfl_team_schedule_transformed(team_id, season)
    return jsonify({"schedule": team_schedule})