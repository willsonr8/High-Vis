class Game:
    def __init__(self, game_id: str, info: dict):
        self.game_id = game_id
        self.season = info.get("season")
        self.game_week: str | None = None
        self.encoded_game_week: int | None = None
        self.season_type = info.get("seasonType")
        self.home_team = info.get("home")
        self.home_id = info.get("teamIDHome")
        self.away_team = info.get("away")
        self.away_id = info.get("teamIDAway")
        self.game_date = info.get("gameDate")
        self.game_time_epoch = info.get("gameTime_epoch")
        self.game_status_code = info.get("gameStatusCode")
        self.game_status = info.get("gameStatus")

        self.home_result = info.get("homeResult")
        self.away_result = info.get("awayResult")
        self.home_points = info.get("homePts")
        self.away_points = info.get("awayPts")

        if self.season_type and self.game_week:
            if self.season_type == "Preseason":
                self.game_week = info.get("gameWeek")
            elif self.season_type == "Regular Season":
                self.game_week = (info.get("gameWeek"))[5:]
            elif self.season_type == "Postseason":
                self.game_week = info.get("gameWeek")
            elif self.season_type is None:
                return
            else:
                raise ValueError(f"Unknown season type: {self.season_type}")

    def load_data(self, info: dict):
        """handles specific situation in which the game data is loaded after the object is created. this occurs
        in the transformer when player games are addressed first and then the game data is loaded."""
        self.season = info.get("season")
        self.game_week: str | None = None
        self.encoded_game_week: int | None = None
        self.season_type = info.get("seasonType")
        self.home_team = info.get("home")
        self.home_id = info.get("teamIDHome")
        self.away_team = info.get("away")
        self.away_id = info.get("teamIDAway")
        self.game_date = info.get("gameDate")
        self.game_time_epoch = info.get("gameTime_epoch")
        self.game_status_code = info.get("gameStatusCode")
        self.game_status = info.get("gameStatus")

        self.home_result = info.get("homeResult")
        self.away_result = info.get("awayResult")
        self.home_points = info.get("homePts")
        self.away_points = info.get("awayPts")

        if self.season_type == "Preseason":
            self.game_week = info.get("gameWeek")
        elif self.season_type == "Regular Season":
            self.game_week = (info.get("gameWeek"))[5:]
        elif self.season_type == "Postseason":
            self.game_week = info.get("gameWeek")
        else:
            raise ValueError(f"Unknown season type: {self.season_type}")


    def to_dict(self):
        return {
            "gameId": self.game_id,
            "season": self.season,
            "gameWeek": self.game_week,
            "encodedGameWeek": self.encoded_game_week,
            "seasonType": self.season_type,
            "homeTeam": self.home_team,
            "homeId": self.home_id,
            "awayTeam": self.away_team,
            "awayId": self.away_id,
            "gameDate": self.game_date,
            "gameTimeEpoch": self.game_time_epoch,
            "gameStatusCode": self.game_status_code,
            "gameStatus": self.game_status,
            "homeResult": self.home_result,
            "awayResult": self.away_result,
            "homePoints": self.home_points,
            "awayPoints": self.away_points
        }

class PlayerGame(Game):
    def __init__(self, game_id: str, info: dict, stats: dict):  # constructor for usage in transformer get_player_game_stats_transformed
        super().__init__(game_id, info)
        self.team_id = stats.get("teamID")
        self.player_id = stats.get("playerID")
        self.player_name = stats.get("longName")
        self.stats = {
            "defensive_stats": stats.get("Defense", {}),
            "receiving_stats": stats.get("Receiving", {}),
            "rushing_stats": stats.get("Rushing", {}),
            "passing_stats": stats.get("Passing", {}),
        }
        self.fantasy_points = stats.get("fantasyPointsDefault", {})
        self.snap_count = stats.get("snapCounts", {})

    def to_dict(self):
        super_dict = super().to_dict()
        super_dict["stats"] = {
            "playerId": self.player_id,
            "playerName": self.player_name,
            "stats": {
                "defensiveStats": self.stats["defensive_stats"],
                "receivingStats": self.stats["receiving_stats"],
                "rushingStats": self.stats["rushing_stats"],
                "passingStats": self.stats["passing_stats"],
            },
            "fantasyPoints": self.fantasy_points,
            "snapCount": self.snap_count
        }
        return super_dict