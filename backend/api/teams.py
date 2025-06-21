from flask import Blueprint, jsonify

from backend.server.requests import Server

team_bp = Blueprint("team", __name__)

@team_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"team_name": "The Test Team"})

@team_bp.route("/all_teams", methods=["GET"])
def get_all_teams(sort_by="standings", rosters=False, schedules=False, top_performers=True, team_stats=True, team_stats_season=2024):
    teams = Server.get_nfl_teams(sort_by, rosters, schedules, top_performers, team_stats, team_stats_season)
    return jsonify(kwargs={"teams": teams})

