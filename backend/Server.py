import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv
import fantasy_values as fv

################################## UTILITY FUNCTIONS ################################
def send_to_json(data, file):
    """
    utility function to save data to a JSON file.
    :param data: the data to be saved.
    :param file: the name of the file where data will be saved. it will be saved in the JSON folder.
    """
    with open(f"json/{file}", 'w', encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

class Server:

    url = None
    headers = None

    ############################## CLASS SETUP METHODS ##############################

    @classmethod
    def initialize(cls):
        """
        this method initializes the server with the domain URL and headers.
        :return:
        """
        load_dotenv()
        cls.url = os.environ.get("DOMAIN", "No Server URL Provided")
        cls.headers = {
            'X-RapidAPI-Key': os.environ.get("DOMAIN_KEY", "No Server Key Provided"),
            'X-RapidAPI-Host': cls.get_url()
        }

    @classmethod
    def get_url(cls):
        """
        returns the URL of the server.
        :return: string containing the server URL.
        """
        if cls.url is None:
            cls.initialize()
        return cls.url

    @classmethod
    def get_headers(cls):
        """
        returns the headers used for API requests.
        :return: dictionary containing the headers.
        """
        if cls.headers is None:
            cls.initialize()
        return cls.headers

    @classmethod
    def make_request(cls, endpoint: str) -> dict:
        """
        makes a GET request to the specified endpoint using the configured URL and headers.
        uses urllib to handle the request and response.
        urllib yields a byte string which is then decoded to a string and parsed as JSON.
        :param endpoint: the API endpoint to which the request is made.
        :return: python dictionary containing the parsed JSON response.
        """
        url = f"https://{cls.get_url()}{endpoint}"

        try:
            request = urllib.request.Request(url, headers=cls.get_headers())
            with urllib.request.urlopen(request) as response:
                data = response.read()
        except urllib.error.HTTPError as e:
            print(f"HTTP error occurred: {e.code} - {e.reason}")
            return {}
        parsed_data: dict = json.loads(data)
        return parsed_data

    ############################## TEAM API CALLS ##############################

    @classmethod
    def get_nfl_teams(cls, sort_by="standings", rosters=False, schedules=False, top_performers=True, team_stats=True, team_stats_season=2024):
        """
        fetches the list of NFL teams from the server.
        :param sort_by: the criteria by which to sort the teams (default is "standings").
        :param rosters: whether to include team rosters in the response (default is False).
        :param schedules: whether to include team schedules in the response (default is False).
        :param top_performers: whether to include top performers in the response (default is True).
        :param team_stats: whether to include team statistics in the response (default is True).
        :param team_stats_season: the season for which to fetch team statistics (default is 2024).
        :return: a list of dictionaries containing team information.
        """
        endpoint = f"/getNFLTeams?sortBy={sort_by}&rosters={rosters}&schedules={schedules}&topPerformers={top_performers}&teamStats={team_stats}&teamStatsSeason={team_stats_season}"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_weekly_nfl_schedule(cls, week=1, season_type="reg", season_year=2024):  # no API method (server function only)
        """
        fetches the weekly NFL schedule from the server.
        :param week: the week of the season for which to fetch the schedule (default is 1) (options = 1-18 or all).
        :param season_type: the type of season (default is "reg" for regular season) (options = reg, post, pre, all).
        :param season_year: the year of the season (default is 2024).
        :return: a list of dictionaries containing the weekly schedule.
        """
        endpoint = f"/getNFLGamesForWeek?week={week}&seasonType={season_type}&season={season_year}"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_nfl_team_roster(cls, team_id=None, archive_date=None):  # no API method (server function only)
        # if its worth doing, get_stats and fantasy_points could be false, but this requires more complex string manipulation due to ampersand.
        """
        fetches the roster of a specific NFL team from the server.
        :param team_id: the ID of the team for which to fetch the roster.
        :param archive_date: the date for which to fetch the roster (roster dates go back to 05-05-2023) (optional, format: YYYYMMDD).
        :return: a dictionary containing the team roster within a list at body.roster.
        """
        archive = f"archiveDate={f"{archive_date}&" if archive_date is not None else ''}"
        endpoint = f"/getNFLTeamRoster?teamID={team_id}&{archive}getStats=true&fantasyPoints=true"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_nfl_depth_charts(cls):  # no API method (server function only)
        """
        fetches the depth charts for all NFL teams from the server.
        returns all teams, no parameters are required.
        :return: a dictionary containing the depth charts for each team. teams are located at index = team_id - 1.
        """
        endpoint = "/getNFLDepthCharts"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_nfl_team_schedule(cls, team_id=None, season_year=2024): # no API method (server function only)
        """
        fetches the schedule for a specific NFL team from the server.
        :param team_id: the ID of the team for which to fetch the schedule.
        :param season_year: the year of the season for which to fetch the schedule (default is 2024).
        :return: a list of dictionaries containing the team's schedule.
        """
        if not team_id:
            raise ValueError("team_id must be provided to fetch the team's schedule.")
        endpoint = f"/getNFLTeamSchedule?teamID={team_id}&season={season_year}"
        data: dict = cls.make_request(endpoint)
        return data


    ############################## PLAYER API CALLS ##############################

    @classmethod
    def get_player_list(cls):  # no API method (server function only)
        """
        fetches the list of all players from the server.
        :return: a list of dictionaries containing player information.
        """
        endpoint = "/getNFLPlayerList"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_fantasy_point_projections(cls, week=None, player_id=None, team_id=None, archive_year=None, fantasy_stat_values: dict = fv.PPR_SCORING):  # no API method (server function only)
        # TODO: check that I can just pass None for the params
        # TODO: check functionality, IDK if this works, and the copilot wrote the params function
        # TODO: check to see if this function uses IDP data
        """
        fetches fantasy point projections for a specific player or team from the server. player_id, team_id
        and archive_year cannot be used together. player_id overrides team_id and week. team_id overrides week.
        archive year does not work with player_id or team_id. to use team_id, player_id must be empty.
        :param week: the week of the season for which to fetch the schedule. (options = 1-18 (reg), 19-22 (post), or "season") (optional)
        :param player_id: the ID of the player for whom to fetch projections (optional).
        :param team_id: the ID of the team for which to fetch projections (optional).
        :param archive_year: the year for which to fetch projections (optional).
        :param fantasy_stat_values: a dictionary containing the scoring values for various fantasy stats (default is PPR scoring).
        :return: a dictionary containing the fantasy point projections.
        """
        if week is None and player_id is None and team_id is None and archive_year is None:
            raise ValueError("At least one of week, player_id, team_id, or archive_year must be provided.")
        params = '&'.join(f"{k}={v}" for k, v in fantasy_stat_values.items())
        endpoint = (f"/getNFLProjections?"
                    f"week={week}&"
                    f"playerId={player_id}&"
                    f"teamId={team_id}&"
                    f"archiveYear={archive_year}"
                    f"{params}")
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_adp(cls, adp_type="PPR", adp_date=None, position=None, filter_out=None):  # no API method (server function only)
        """
        fetches the Average Draft Position (ADP) for players from the server.
        :param adp_type: the type of ADP to fetch (e.g., "PPR", "halfPPR", "standard", "bestBall", "IDP", "superFlex").
        :param adp_date: the date for which to fetch ADP (goes back to 04-16-2024) (format: YYYYMMDD).
        :param position: the position of players to filter by (can be QB, RB, WR, TE, DST, K, LB, DE, S, CB, DT).
        :param filter_out: the position of players to filter out. valid positions are QB, RB, WR, TE, DST, K, LB, DE, S, CB, DT.
        if you would like to filter out multiple positions, then concatenate them. for example, filtering out QB and RB would look like "QBRB".
        :return: a list of dictionaries containing player ADP information.
        """
        if adp_type not in ["PPR", "halfPPR", "standard", "bestBall", "IDP", "superFlex"]:
            raise ValueError("Invalid ADP type. Must be one of: PPR, halfPPR, standard, bestBall, IDP, superFlex.")
        date = f"&adpDate={adp_date}" if adp_date is not None else ""
        desired_pos = f"&position={position}" if position is not None else ""
        undesired_pos = f"&filterOut{filter_out}" if filter_out is not None else ""
        endpoint = f"/getNFLADP?adpType={adp_type}{date}{desired_pos}{undesired_pos}"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def top_news_and_headlines(cls, player_id=None, team_id=None, top_news=True, fantasy_news=True, recent_news=True, max_items=20): # no API method (server function only)
        """
        fetches top news and headlines for players or teams from the server.
        :param player_id: the ID of the player for whom to fetch news (optional). overrides team_id.
        :param team_id: the ID of the team for which to fetch news (optional).
        :param top_news: whether to include top news in the response (default is True).
        :param fantasy_news: whether to include fantasy news in the response (default is True).
        :param recent_news: whether to include recent news in the response (default is True).
        :param max_items: the maximum number of news items to return (default is 20).
        :return: a list of dictionaries containing news items.
        """
        player = f"playerID={player_id}&" if player_id else ""
        team = f"teamID={team_id}&" if team_id else ""
        endpoint = f"/getNFLNews?{player}{team}topNews={top_news}&fantasyNews={fantasy_news}&recentNews={recent_news}&maxItems={max_items}"
        data: dict = cls.make_request(endpoint)
        return data

    ############################## GAME API CALLS ##############################

    @classmethod
    def get_nfl_game_box_score(cls, game_id=None, play_by_play=True, fantasy_points=True, fantasy_stat_values: dict = fv.IDP_PPR_SCORING):  # no API method (server function only)
        # this function is pertinent because you will know the game ID of each game that an individual player plays in.
        # therefore, you can simply parse through the play by play of each game to find the actual plays they were involved in.
        # this may also be useful for displaying target share in certain areas of the field.
        """
        fetches the box score for a specific NFL game from the server.
        :param game_id: the ID of the game for which to fetch the box score.
        :param play_by_play: whether to include play-by-play data in the response (default is True).
        :param fantasy_points: whether to include fantasy points in the response (default is True).
        :param fantasy_stat_values: a dictionary containing the fantasy point projections. this function uses IDP data.
        :return: a dictionary containing the game box score.
        """
        if not game_id:
            raise ValueError("game_id must be provided to fetch the box score.")
        params = '&'.join(f"{k}={v}" for k, v in fantasy_stat_values.items())
        endpoint = f"/getNFLGameBoxScore?gameID={game_id}&playByPlay={play_by_play}&fantasyPoints={fantasy_points}{params}"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_general_game_info(cls, game_id=None):  # no API method (server function only)
        """
        fetches general information about a specific NFL game from the server.
        :param game_id: the ID of the game for which to fetch information.
        :return: a dictionary containing general game information.
        """
        if not game_id:
            raise ValueError("game_id must be provided to fetch general game information.")
        endpoint = f"/getNFLGameInfo?gameID={game_id}"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_nfl_betting_odds(cls, game_date=None, game_id=None, item_format="map", implied_totals=True): # no API method (server function only)
        """
        fetches betting odds for NFL games from the server. results include total under, team spreads for home/away,
        money line odds for home/away, and implied totals for each team from multiple different sportsbooks.
        :param game_date: the date of the game for which to fetch betting odds (optional, format: YYYYMMDD).
        :param game_id: the ID of the game for which to fetch betting odds (optional).
        :param item_format: the format in which to return the betting odds (default is "map"). options are "map" or "list".
        :param implied_totals: whether to include implied totals in the response (default is True).
        :return: a dictionary containing betting odds information. output depends on item_format.
        """
        if game_id is None and game_date is None:
            raise ValueError("At least one of game_id or game_date must be provided.")
        date = f"gameDate={game_date}&" if game_date else ""
        game = f"gameID={game_id}&" if game_id else ""
        endpoint = f"/getNFLBettingOdds?{date}{game}itemFormat={item_format}&impliedTotals={implied_totals}"
        data: dict = cls.make_request(endpoint)
        return data

    @classmethod
    def get_daily_scoreboard(cls, game_date=None, game_id = None, top_performers=True, game_week=None, season_year=2024, season_type="reg"):  # no API method (server function only)
        # this should probably be used with game_week and season_year as opposed to game_date.
        """
        fetches the daily scoreboard for NFL games from the server. top performers shows the best players for each team in each
        relevant statistical category for completed games and shows the best players throughout the season for ongoing/future games.
        :param game_date: the date of the game for which to fetch the scoreboard (optional, format: YYYYMMDD) (overrides game_id).
        :param game_id: the ID of the game for which to fetch the scoreboard (optional).
        :param top_performers: whether to include top performers in the response (default is True).
        :param game_week: the week of the season for which to fetch the scoreboard (optional).
        :param season_year: the year of the season for which to fetch the scoreboard (default is 2024) (overrides game_id when used with game_week).
        :param season_type: the type of season (default is "reg" for regular season) (options = reg, post, pre, all).
        :return: a dictionary containing daily scoreboard information.
        """
        date = f"gameDate={game_date}&" if game_date else ""
        game = f"gameID={game_id}&" if game_id else ""
        week = f"gameWeek={game_week}&" if game_week else ""
        endpoint = f"/getNFLScoresOnly?{date}{game}topPerformers={top_performers}&{week}season={season_year}&seasonType={season_type}"
        data: dict = cls.make_request(endpoint)
        return data

    ############################## API INFO ##############################

    @classmethod
    def get_change_log(cls, days=30, future_only=False): # no API method (server function only)
        # this may be useful for logging purposes, but it is not necessary for the functionality of the server.
        """
        fetches changelog information about the API from the server.
        :return: a dictionary containing API information.
        """
        endpoint = f"/getNFLChangelog?maxDays={days}&futureOnly={future_only}"
        data: dict = cls.make_request(endpoint)
        return data
