class Injury:
    def __init__(self, description="", injDate="", injReturnDate="", designation=""):
        self.description = description
        self.injDate = injDate
        self.injReturnDate = injReturnDate
        self.designation = designation

class StatsCategory:
    def __init__(self, stats_dict):
        # Store all keys as floats when possible, else raw string
        self.stats = {}
        for k, v in stats_dict.items():
            try:
                self.stats[k] = float(v)
            except (ValueError, TypeError):
                self.stats[k] = v

    def __getitem__(self, key):
        return self.stats.get(key)

    def __repr__(self):
        return str(self.stats)

class Player:
    def __init__(self, raw_data):
        data = raw_data["body"] if type(raw_data["body"]) == dict else raw_data["body"][0]
        self.player_id = data.get("playerID")
        self.name = data.get("espnName")
        self.weight = int(data.get("weight")) if data.get("weight") else None
        self.jersey_num = int(data.get("jerseyNum")) if data.get("jerseyNum") else None
        self.team_abv = data.get("team")
        self.age = int(data.get("age")) if data.get("age") else None
        self.birthday = data.get("bDay")
        self.espn_headshot = data.get("espnHeadshot")
        self.is_free_agent = data.get("isFreeAgent") == "True"
        self.injury = Injury(**data.get("injury", {}))
        self.team_id = data.get("teamID")
        self.position = data.get("pos")
        self.school = data.get("school")
        self.height = data.get("height")
        self.last_game_played = data.get("lastGamePlayed")
        self.experience = int(data.get("exp")) if data.get("exp") else None

        stats = data.get("stats", {})
        self.stats = {}
        for category in ["Rushing", "Passing", "Receiving", "Defense"]:
            if category in stats:
                self.stats[category] = StatsCategory(stats[category])
        self.games_played = int(stats.get("gamesPlayed", 0))

    def to_dict(self):
        return {
            "playerId": self.player_id,
            "name": self.name,
            "position": self.position,
            "teamAbv": self.team_abv,
            "teamId": self.team_id,
            "weight": self.weight,
            "jerseyNum": self.jersey_num,
            "age": self.age,
            "birthday": self.birthday,
            "espnHeadshot": self.espn_headshot,
            "isFreeAgent": self.is_free_agent,
            "injury": {
                "description": self.injury.description,
                "injDate": self.injury.injDate,
                "injReturnDate": self.injury.injReturnDate,
                "designation": self.injury.designation
            },
            "school": self.school,
            "height": self.height,
            "lastGamePlayed": self.last_game_played,
            "experience": self.experience,
            "stats": {
                category: stats_cat.stats for category, stats_cat in self.stats.items()
            },
            "gamesPlayed": self.games_played
        }

