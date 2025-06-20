import http.client
import json
from dotenv import load_dotenv
import os

PPR = {
    "twoPointConversion": 2,
    "rushYds": 0.1,
    "carries": 0,
    "rushTD": 6,
    "passAttempts": 0,
    "passTD": 4,
    "passYds": 0.04,
    "int": -2,
    "passCompletions": 0,
    "receptions": 1,
    "recTD": 6,
    "targets": 0,
    "recYds": 0.1,
    "fumblesLost": -2,
}

half_PPR = {
    "twoPointConversion": 2,
    "rushYds": 0.1,
    "carries": 0,
    "rushTD": 6,
    "passAttempts": 0,
    "passTD": 4,
    "passYds": 0.04,
    "int": -2,
    "passCompletions": 0,
    "receptions": 0.5,
    "recTD": 6,
    "targets": 0,
    "recYds": 0.1,
    "fumblesLost": -2,
}

standard = {
    "twoPointConversion": 2,
    "rushYds": 0.1,
    "carries": 0,
    "rushTD": 6,
    "passAttempts": 0,
    "passTD": 4,
    "passYds": 0.04,
    "int": -2,
    "passCompletions": 0,
    "receptions": 0,
    "recTD": 6,
    "targets": 0,
    "recYds": 0.1,
    "fumblesLost": -2,
}


def calculate_projections(projections, point_values=None):
    if point_values is None:
        point_values = PPR
    weekly_projections = []

    for week_data in projections:
        total_projection = 0.0
        for key, value in week_data.items():
            if isinstance(value, dict):
                for sub_key, sub_value in value.items():
                    float_value = float(sub_value)
                    total_projection += float_value * point_values.get(sub_key, 1)
            elif key != "week":
                float_value = float(value)
                total_projection += float_value * point_values.get(key, 1)
        weekly_projections.append(round(total_projection, 2))

    return weekly_projections


class APICalls:
    url = None
    headers = None

    @classmethod
    def initialize(cls):
        """
        This method initializes the API calls by loading environment variables.
        """
        load_dotenv()
        cls.url = os.environ["RAPID_API_URL"]
        cls.headers = {
            'X-RapidAPI-Key': os.environ["RAPID_API_KEY"],
            'X-RapidAPI-Host': os.environ["RAPID_API_URL"]
        }

    @classmethod
    def make_request(cls, endpoint):
        """
        Makes a GET request to the specified endpoint using the configured URL and headers.
        :param endpoint: The API endpoint to which the request is made.
        :return: Python dictionary containing the parsed JSON response.
        """
        if cls.url is None:
            raise ValueError("URL is not set. Please configure cls.url before making a request.")
        conn = http.client.HTTPSConnection(cls.url)
        conn.request("GET", endpoint, headers=cls.headers)
        response = conn.getresponse()
        data = response.read().decode("utf-8")
        parsed_data = json.loads(data)
        print(f"Cache miss on this call: {conn}")
        return parsed_data

    @classmethod
    def get_player_news(cls, player_id):
        endpoint = f"/getNFLNews?playerID={player_id}&topNews=true&fantasyNews=true&recentNews=true&maxItems=10"

        return cls.make_request(endpoint)

    @classmethod
    def get_nfl_teams(cls):
        endpoint = "/getNFLTeams?rosters=false&schedules=true&topPerformers=false&teamStats=true"

        return cls.make_request(endpoint)

    @classmethod
    def get_single_player_stats(cls, player_id, year):  # Get NFL Games and Stats for Single Player

        endpoint = f"/getNFLGamesForPlayer?playerID={player_id}&fantasyPoints=true&twoPointConversions=2&" \
                   f"passYards=.04&passTD=4&passInterceptions=-2&pointsPerReception=1&carries=.2&rushYards=.1&" \
                   f"rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=0&defTD=6"

        return cls.make_request(endpoint)

    @classmethod
    def get_player_info(cls, player_name):  # Get Player Information

        endpoint = f"/getNFLPlayerInfo?playerName={player_name}&getStats=true"
        return cls.make_request(endpoint)

    @classmethod
    def get_weekly_schedule(cls, week, year="2024"):
        endpoint = f"/getNFLGamesForWeek?week={week}&seasonType=reg&season={year}"
        return cls.make_request(endpoint)

    @classmethod
    def get_team_schedule(cls, team_abv, year="2024"):
        endpoint = f"/getNFLTeamSchedule?teamAbv={team_abv}&season={year}"
        return cls.make_request(endpoint)

    @classmethod
    def get_game_info(cls, game_id):
        endpoint = f"/getNFLGameInfo?gameID={game_id}"
        return cls.make_request(endpoint)

    @classmethod
    def update_scoring_type(cls, player_id, team, scoring_type="PPR", year="2024"): # TODO
        parsed_data = cls.get_single_player_stats(player_id, year)

        fantasy_points = []
        player_games = []

        seen_games = set()

        completed_team_games, all_team_games, opponents, bye_week = cls.store_team_games(team, year)

        for key in parsed_data["body"].keys():
            game_ID = parsed_data["body"][key]["gameID"]
            player_games.append(game_ID)

        for game in completed_team_games:
            if game in player_games:  # handles games where points accrued

                game_data = parsed_data["body"].get(game, {})

                game_points = float(game_data.get("fantasyPointsDefault", {}).get(f"{scoring_type}", 0.0))

                fantasy_points.append(game_points)

                seen_games.add(game)

            elif game is None:  # handles bye weeks
                fantasy_points.append(None)

            else:  # handles games where no points accrued
                fantasy_points.append(0.0)

        for game in player_games:
            if game not in seen_games:

                if int(game[0:8]) > 20240827:  # acts as a date comparison
                    game_week = cls.get_game_week(game)

                    if game_week <= len(fantasy_points):
                        fantasy_points[game_week - 1] = float(parsed_data["body"][game]["fantasyPointsDefault"][f"{scoring_type}"])

        return fantasy_points

    @classmethod
    def get_fantasy_projections(cls, player_id, year):
        endpoint = (f"/getNFLProjections?playerID={player_id}&archiveSeason={year}&twoPointConversions=2&passYards=.04&"
                    "passAttempts=-.5&passTD=4&passCompletions=1&passInterceptions=-2&pointsPerReception=1&carries=.2&"
                    "rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=.1&fgMade=3&fgMissed=-1"
                    "&xpMade=1&xpMissed=-1")

        data = cls.make_request(endpoint)
        projections = calculate_projections(data['body']['projections'])
        return projections

    @classmethod
    def get_fantasy_info(cls, player_id, team, year, scoring_type="PPR"):  # uses Get NFL Games and Stats For a Single Player
        parsed_data = cls.get_single_player_stats(player_id, year)
        fantasy_points = []
        # "Rushing"
        rush_avg = []
        rush_yards = []
        carries = []
        long_rush = []
        rush_td = []
        # "Defense"
        fumbles = []
        fumbles_lost = []
        # "Receiving"
        receptions = []
        rec_td = []
        long_rec = []
        targets = []
        rec_yards = []
        rec_avg = []
        two_point_conversions = []
        # "Passing"
        pass_attempts = []
        pass_avg = []
        pass_td = []
        pass_yds = []
        interceptions = []
        pass_completions = []

        player_games = []

        seen_games = set()

        if year == 2024:  # this is bad code, but need a solution. Hardcodes date values in YYYYMMDD
            season_start = 20240903
            season_end = 20250301
        elif year == 2023:
            season_start = 20230903
            season_end = 20240301
            team = parsed_data["teamAbv"]
        else:
            season_start = 20240903
            season_end = 20250301

        completed_team_games, all_team_games, opponents, bye_week = cls.store_team_games(team, year)
        projections = cls.get_fantasy_projections(player_id, year)

        for key in parsed_data["body"].keys():
            game_ID = parsed_data["body"][key]["gameID"]
            player_games.append(game_ID)

        for game in completed_team_games:
            if game in player_games:  # handles games where points accrued

                game_data = parsed_data["body"].get(game, {})
                game_points = float(game_data.get("fantasyPointsDefault", {}).get(f"{scoring_type}", 0.0))
                game_rush_avg = float(game_data.get("Rushing", {}).get("rushAvg", 0.0))
                game_rush_yards = float(game_data.get("Rushing", {}).get("rushYds", 0.0))
                game_carries = float(game_data.get("Rushing", {}).get("carries", 0.0))
                game_long_rush = float(game_data.get("Rushing", {}).get("longRush", 0.0))
                game_rush_td = float(game_data.get("Rushing", {}).get("rushTD", 0.0))
                # "Defense"
                game_fumbles = float(game_data.get("Defense", {}).get("fumbles", 0.0))
                game_fumbles_lost = float(game_data.get("Defense", {}).get("fumblesLost", 0.0))
                # "Receiving"
                game_receptions = float(game_data.get("Receiving", {}).get("receptions", 0.0))
                game_rec_td = float(game_data.get("Receiving", {}).get("recTD", 0.0))
                game_long_rec = float(game_data.get("Receiving", {}).get("longRec", 0.0))
                game_targets = float(game_data.get("Receiving", {}).get("targets", 0.0))
                game_rec_yards = float(game_data.get("Receiving", {}).get("recYds", 0.0))
                game_rec_avg = float(game_data.get("Receiving", {}).get("recAvg", 0.0))
                game_two_point_conversions = float(game_data.get("Rushing", {}).get("receivingTwoPointConversion", 0.0))
                # "Passing"
                game_pass_attempts = float(game_data.get("Passing", {}).get("passAttempts", 0.0))
                game_pass_avg = float(game_data.get("Passing", {}).get("passAvg", 0.0))
                game_pass_td = float(game_data.get("Passing", {}).get("passTD", 0.0))
                game_pass_yds = float(game_data.get("Passing", {}).get("passYds", 0.0))
                game_interceptions = float(game_data.get("Passing", {}).get("int", 0.0))
                game_pass_completions = float(game_data.get("Passing", {}).get("passCompletions", 0.0))

                fantasy_points.append(game_points)
                rush_avg.append(game_rush_avg)
                rush_yards.append(game_rush_yards)
                carries.append(game_carries)
                long_rush.append(game_long_rush)
                rush_td.append(game_rush_td)
                # "Defense"
                fumbles.append(game_fumbles)
                fumbles_lost.append(game_fumbles_lost)
                # "Receiving"
                receptions.append(game_receptions)
                rec_td.append(game_rec_td)
                long_rec.append(game_long_rec)
                targets.append(game_targets)
                rec_yards.append(game_rec_yards)
                rec_avg.append(game_rec_avg)
                two_point_conversions.append(game_two_point_conversions)
                # "Passing"
                pass_attempts.append(game_pass_attempts)
                pass_avg.append(game_pass_avg)
                pass_td.append(game_pass_td)
                pass_yds.append(game_pass_yds)
                interceptions.append(game_interceptions)
                pass_completions.append(game_pass_completions)

                seen_games.add(game)

            elif game is None:  # handles bye weeks
                fantasy_points.append(None)
                rush_avg.append(None)
                rush_yards.append(None)
                carries.append(None)
                long_rush.append(None)
                rush_td.append(None)
                # "Defense"
                fumbles.append(None)
                fumbles_lost.append(None)
                # "Receiving"
                receptions.append(None)
                rec_td.append(None)
                long_rec.append(None)
                targets.append(None)
                rec_yards.append(None)
                rec_avg.append(None)
                two_point_conversions.append(None)
                # "Passing"
                pass_attempts.append(None)
                pass_avg.append(None)
                pass_td.append(None)
                pass_yds.append(None)
                interceptions.append(None)
                pass_completions.append(None)

            else:  # handles games where no points accrued
                fantasy_points.append(0.0)
                rush_avg.append(0.0)
                rush_yards.append(0.0)
                carries.append(0.0)
                long_rush.append(0.0)
                rush_td.append(0.0)
                # "Defense"
                fumbles.append(0.0)
                fumbles_lost.append(0.0)
                # "Receiving"
                receptions.append(0.0)
                rec_td.append(0.0)
                long_rec.append(0.0)
                targets.append(0.0)
                rec_yards.append(0.0)
                rec_avg.append(0.0)
                two_point_conversions.append(0.0)
                # "Passing"
                pass_attempts.append(0.0)
                pass_avg.append(0.0)
                pass_td.append(0.0)
                pass_yds.append(0.0)
                interceptions.append(0.0)
                pass_completions.append(0.0)

        for game in player_games:
            if game not in seen_games:
                if season_end > int(game[0:8]) > season_start:  # should be a way to clean this up
                    game_week = cls.get_game_week(game)

                    if game_week <= len(fantasy_points):
                        fantasy_points[game_week - 1] = float(parsed_data["body"][game]["fantasyPointsDefault"][f"{scoring_type}"])
                        rush_avg[game_week - 1] = float(
                            parsed_data["body"][game].get("Rushing", {}).get("rushAvg", 0.0))
                        rush_yards[game_week - 1] = float(
                            parsed_data["body"][game].get("Rushing", {}).get("rushYds", 0.0))
                        carries[game_week - 1] = float(parsed_data["body"][game].get("Rushing", {}).get("carries", 0.0))
                        long_rush[game_week - 1] = float(
                            parsed_data["body"][game].get("Rushing", {}).get("longRush", 0.0))
                        rush_td[game_week - 1] = float(parsed_data["body"][game].get("Rushing", {}).get("rushTD", 0.0))
                        fumbles[game_week - 1] = float(parsed_data["body"][game].get("Defense", {}).get("fumbles", 0.0))
                        fumbles_lost[game_week - 1] = float(
                            parsed_data["body"][game].get("Defense", {}).get("fumblesLost", 0.0))
                        receptions[game_week - 1] = float(
                            parsed_data["body"][game].get("Receiving", {}).get("receptions", 0.0))
                        rec_td[game_week - 1] = float(parsed_data["body"][game].get("Receiving", {}).get("recTD", 0.0))
                        long_rec[game_week - 1] = float(
                            parsed_data["body"][game].get("Receiving", {}).get("longRec", 0.0))
                        targets[game_week - 1] = float(parsed_data["body"][game].get("Receiving", {}).get("targets", 0.0))
                        rec_yards[game_week - 1] = float(
                            parsed_data["body"][game].get("Receiving", {}).get("recYds", 0.0))
                        rec_avg[game_week - 1] = float(parsed_data["body"][game].get("Receiving", {}).get("recAvg", 0.0))
                        two_point_conversions[game_week - 1] = float(
                            parsed_data["body"][game].get("Receiving", {}).get("receivingTwoPointConversion", 0.0))
                        pass_attempts[game_week - 1] = float(
                            parsed_data["body"][game].get("Passing", {}).get("passAttempts", 0.0))
                        pass_avg[game_week - 1] = float(
                            parsed_data["body"][game].get("Passing", {}).get("passAvg", 0.0))
                        pass_td[game_week - 1] = float(parsed_data["body"][game].get("Passing", {}).get("passTD", 0.0))
                        pass_yds[game_week - 1] = float(
                            parsed_data["body"][game].get("Passing", {}).get("passYds", 0.0))
                        interceptions[game_week - 1] = float(
                            parsed_data["body"][game].get("Passing", {}).get("int", 0.0))
                        pass_completions[game_week - 1] = float(
                            parsed_data["body"][game].get("Passing", {}).get("passCompletions", 0.0))

        if bye_week is not None:
            projections.insert(bye_week - 1, None)

        stats_dict = {
            "team_games": opponents,
            "rush_avg": rush_avg,
            "rush_yards": rush_yards,
            "carries": carries,
            "long_rush": long_rush,
            "rush_td": rush_td,
            "fumbles": fumbles,
            "fumbles_lost": fumbles_lost,
            "receptions": receptions,
            "rec_td": rec_td,
            "long_rec": long_rec,
            "targets": targets,
            "rec_yards": rec_yards,
            "rec_avg": rec_avg,
            "two_point_conversions": two_point_conversions,
            "pass_attempts": pass_attempts,
            "pass_avg": pass_avg,
            "pass_td": pass_td,
            "pass_yds": pass_yds,
            "interceptions": interceptions,
            "pass_completions": pass_completions,
            "fantasy_points": fantasy_points,
            "projections": projections}
        return stats_dict

    @classmethod
    def store_team_games(cls, team, year):

        parsed_data = cls.get_team_schedule(team, year)
        completed_team_games = []
        all_team_games = []
        bye_week = None

        game_weeks = []
        for game_data in parsed_data["body"]["schedule"]:
            game_type = game_data.get("seasonType")
            game_status = game_data.get("gameStatus")
            game_ID = game_data.get("gameID")
            game_time = game_data.get("gameTime_epoch")
            game_string = game_data.get('away') + ' @ ' + game_data.get('home')

            if game_type == "Regular Season" and game_data.get('away') != game_data.get('home'):
                if game_status == "Completed":
                    completed_team_games.append(game_ID)
                else:
                    completed_team_games.append(None)

                game_week = int(game_data.get("gameWeek")[5:])
                game_weeks.append(game_week)
                all_team_games.append((game_week, game_string))

        indices_to_remove = []

        for i in range(len(game_weeks) - 1): # TODO: combine below into one function, possible performance increase

            if game_weeks[i] == game_weeks[i + 1]:
                indices_to_remove.append(i + 1)

        for index in sorted(indices_to_remove, reverse=True):
            del completed_team_games[index]
            del all_team_games[index]
            del game_weeks[index]

        for i in range(len(game_weeks) - 1):
            if (game_weeks[i] + 1) != (game_weeks[i + 1]):
                completed_team_games.insert(i + 1, None)
                all_team_games.insert(i + 1, (i + 2, "Bye"))
                bye_week = i + 2

        opponents = []
        for i in all_team_games:
            opponents.append(i[1])
        return completed_team_games, all_team_games, opponents, bye_week

    @classmethod
    def get_game_week(cls, game_id):

        parsed_data = cls.get_game_info(game_id)
        game_week = parsed_data["body"]["gameWeek"][5:]
        if game_week.isdigit():
            return int(game_week)
        else:
            return -1

    @classmethod
    def player_news_stack(cls, player, option, option_dict):
        parsed_data = json.loads(cls.get_player_news(player.ID))
        news_dict = []
        for news in parsed_data["body"]:
            real_title = news.get("title")
            title = real_title.lower()
            link = news.get("link")
            week_number = None
            if 'week ' in title:
                week_substr = title.split('week ')[1].split()[0]
                if week_substr.isdigit():
                    week_number = int(week_substr)
            if week_number and 1 <= week_number <= 18:
                news_dict.append((week_number, option_dict[option][week_number - 1], real_title, link))
        return news_dict

    @classmethod
    def get_all_players(cls):
        endpoint = "/getNFLPlayerList"
        return cls.make_request(endpoint)
