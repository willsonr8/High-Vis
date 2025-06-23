class PlayerGame:
    def __init__(self, game_id, stats):  # constructor for usage in transformer get_player_game_stats_transformed
        self.game_id = game_id
        self.player_id = stats.get("playerID")
        self.player_name = stats.get("longName")
        self.season = stats.get("season", 0)
        self.team_id = stats.get("teamID")
        self.team_abv = stats.get("teamAbv")
        self.stats = {
            "defensive_stats": stats.get("Defense", {}),
            "receiving_stats": stats.get("Receiving", {}),
            "rushing_stats": stats.get("Rushing", {}),
            "passing_stats": stats.get("Passing", {}),
        }
        self.fantasy_points = stats.get("fantasyPointsDefault", {})
        self.snap_count = stats.get("snapCounts", {})

    def to_dict(self):
        return {
            "gameId": self.game_id,
            "playerId": self.player_id,
            "playerName": self.player_name,
            "season": self.season,
            "teamId": self.team_id,
            "teamAbv": self.team_abv,
            "stats": {
                "defensiveStats": self.stats["defensive_stats"],
                "receivingStats": self.stats["receiving_stats"],
                "rushingStats": self.stats["rushing_stats"],
                "passingStats": self.stats["passing_stats"],
            },
            "fantasyPoints": self.fantasy_points,
            "snapCount": self.snap_count
        }