import React, { useState, useEffect } from "react";
import {getFantasyPlayerStats} from "@/api/ApiCalls";
import RenderTable from "@/components/player_name/Table";
import RenderLineChart from "@/components/player_name/LineChart";
import SeasonSelect from "@/components/player_name/Select";

const team_dict = {
    "ARI": "cardinals",
    "ATL": "falcons",
    "BAL": "ravens",
    "BUF": "bills",
    "CAR": "panthers",
    "CHI": "bears",
    "CIN": "bengals",
    "CLE": "browns",
    "DAL": "cowboys",
    "DEN": "broncos",
    "DET": "lions",
    "GB": "packers",
    "HOU": "texans",
    "IND": "colts",
    "JAX": "jaguars",
    "KC": "chiefs",
    "LAC": "chargers",
    "LAR": "rams",
    "LV": "raiders",
    "MIA": "dolphins",
    "MIN": "vikings",
    "NO": "saints",
    "NYG": "giants",
    "NYJ": "jets",
    "PHI": "eagles",
    "PIT": "steelers",
    "SEA": "seahawks",
    "SF": "49ers",
    "TB": "buccaneers",
    "TEN": "titans",
    "WAS": "commanders"
}

export interface PlayerStats {
    rush_avg: number[];
    rush_yards: number[];
    carries: number[];
    long_rush: number[];
    rush_td: number[];
    fumbles: number[];
    fumbles_lost: number[];
    receptions: number[];
    rec_td: number[];
    long_rec: number[];
    targets: number[];
    rec_yards: number[];
    rec_avg: number[];
    two_point_conversions: number[];
    pass_attempts: number[];
    pass_avg: number[];
    pass_td: number[];
    pass_yds: number[];
    interceptions: number[];
    pass_completions: number[];
    fantasy_points: number[];
    projections: number[];
    team_games: string[];
}

export type CachedData = {
  parsedPlayerStats: PlayerStats | null;
  rows: any[];
  cols: any[];
};

function getRows(data: PlayerStats) {
  const all_rows = []
  for (let i = 0; i < data.team_games.length; i++) {
    const newRow = {
      week: i + 1,
      fantasy_points: data.fantasy_points[i],
      projections: data.projections[i],
      rush_avg: data.rush_avg[i],
      rush_yards: data.rush_yards[i],
      carries: data.carries[i],
      long_rush: data.long_rush[i],
      rush_td: data.rush_td[i],
      fumbles: data.fumbles[i],
      fumbles_lost: data.fumbles_lost[i],
      receptions: data.receptions[i],
      rec_td: data.rec_td[i],
      long_rec: data.long_rec[i],
      targets: data.targets[i],
      rec_yards: data.rec_yards[i],
      rec_avg: data.rec_avg[i],
      two_point_conversions: data.two_point_conversions[i],
      pass_attempts: data.pass_attempts[i],
      pass_avg: data.pass_avg[i],
      pass_td: data.pass_td[i],
      pass_yds: data.pass_yds[i],
      interceptions: data.interceptions[i],
      pass_completions: data.pass_completions[i],
      team_games: data.team_games[i]
    }
    all_rows.push(newRow)
  }
  return all_rows;
}

function getCols(position: string) {
  if (position == "QB") {
    return qb_columns
  }
  else if (position == "WR" || position == "TE") {
    return wr_columns
  }
  else if (position == "RB") {
    return rb_columns
  }
  else {
    return wr_columns
  }
}

const qb_columns = [
  {
    key: "week",
    label: "Week"
  },
  {
    key: "team_games",
    label: "Game",
  },
  {
    key: "projections",
    label: "Projected"
  },
  {
    key: "fantasy_points",
    label: "Points",
  },
  {
    key: "pass_yds",
    label: "Pass Yards",
  },
  {
    key: "pass_td",
    label: "Pass TDs",
  },
    {
    key: "interceptions",
    label: "Ints",
  },
  {
    key: "pass_attempts",
    label: "Attempts"
  },
  {
    key: "pass_completions",
    label: "Completions",
  },
  {
    key: "pass_avg",
    label: "Yds/Attempt",
  },
  {
    key: "rush_yards",
    label: "Rush Yds",
  },
  {
    key: "rush_td",
    label: "Rush TDs"
  },
  {
    key: "carries",
    label: "Carries",
  },
  {
    key: "long_rush",
    label: "Long Rush",
  },
  {
    key: "rush_avg",
    label: "Yds/Rush",
  },
  {
    key: "fumbles",
    label: "Fumbles"
  },
  {
    key: "fumbles_lost",
    label: "Fumbles Lost",
  },
  {
    key: "receptions",
    label: "Receptions",
  },
  {
    key: "targets",
    label: "Targets",
  },
  {
    key: "rec_yards",
    label: "Rec Yards"
  },
  {
    key: "rec_td",
    label: "Rec TDs",
  },
  {
    key: "long_rec",
    label: "Long Rec",
  },
  {
    key: "rec_avg",
    label: "Yds/Reception",
  },
  {
    key: "two_point_conversions",
    label: "2 Point Conv."
  },
];

const wr_columns = [
  {
    key: "week",
    label: "Week"
  },
  {
    key: "team_games",
    label: "Game",
  },
  {
    key: "projections",
    label: "Projected"
  },
  {
    key: "fantasy_points",
    label: "Points",
  },
    {
    key: "receptions",
    label: "Receptions",
  },
  {
    key: "targets",
    label: "Targets",
  },
  {
    key: "rec_yards",
    label: "Rec Yards"
  },
  {
    key: "rec_td",
    label: "Rec TDs",
  },
  {
    key: "long_rec",
    label: "Long Rec",
  },
  {
    key: "rec_avg",
    label: "Yds/Reception",
  },
  {
    key: "rush_yards",
    label: "Rush Yds",
  },
  {
    key: "rush_td",
    label: "Rush TDs"
  },
  {
    key: "carries",
    label: "Carries",
  },
  {
    key: "long_rush",
    label: "Long Rush",
  },
  {
    key: "rush_avg",
    label: "Yds/Rush",
  },
  {
    key: "fumbles",
    label: "Fumbles"
  },
  {
    key: "fumbles_lost",
    label: "Fumbles Lost",
  },
  {
    key: "two_point_conversions",
    label: "2 Point Conv."
  },
    {
    key: "pass_yds",
    label: "Pass Yards",
  },
  {
    key: "pass_td",
    label: "Pass TDs",
  },
  {
    key: "interceptions",
    label: "Ints",
  },
  {
    key: "pass_attempts",
    label: "Attempts"
  },
  {
    key: "pass_completions",
    label: "Completions",
  },
  {
    key: "pass_avg",
    label: "Yds/Attempt",
  },
];

const rb_columns = [
  {
    key: "week",
    label: "Week"
  },
  {
    key: "team_games",
    label: "Game",
  },
  {
    key: "projections",
    label: "Projected"
  },
  {
    key: "fantasy_points",
    label: "Points",
  },
  {
    key: "rush_yards",
    label: "Rush Yds",
  },
  {
    key: "rush_td",
    label: "Rush TDs"
  },
  {
    key: "carries",
    label: "Carries",
  },
  {
    key: "long_rush",
    label: "Long Rush",
  },
  {
    key: "rush_avg",
    label: "Yds/Rush",
  },
  {
    key: "fumbles",
    label: "Fumbles"
  },
  {
    key: "fumbles_lost",
    label: "Fumbles Lost",
  },
  {
    key: "receptions",
    label: "Receptions",
  },
  {
    key: "targets",
    label: "Targets",
  },
  {
    key: "rec_yards",
    label: "Rec Yards"
  },
  {
    key: "rec_td",
    label: "Rec TDs",
  },
  {
    key: "long_rec",
    label: "Long Rec",
  },
  {
    key: "rec_avg",
    label: "Yds/Reception",
  },
  {
    key: "two_point_conversions",
    label: "2 Point Conv."
  },
    {
    key: "pass_yds",
    label: "Pass Yards",
  },
  {
    key: "pass_td",
    label: "Pass TDs",
  },
    {
    key: "interceptions",
    label: "Ints",
  },
  {
    key: "pass_attempts",
    label: "Attempts"
  },
  {
    key: "pass_completions",
    label: "Completions",
  },
  {
    key: "pass_avg",
    label: "Yds/Attempt",
  },
];

const renderFantasyData = async (player_id: string, team: string, player_pos: string) => {
    const playerData = await getFantasyPlayerStats(player_id, team);
    if (playerData !== null) {
        playerData["player_pos"] = player_pos;
        return playerData
    }
    else {
        return "Cannot validate player data"
    }
};

const PlayerPage = ({player_json}) => {
    const [playerData, setPlayerData] = useState(null);
    const [rows, setRows] = useState();
    const [cols, setCols] = useState()
    const [year, setYear] = useState(sessionStorage.getItem("year") || "2024");
    const [loading, setLoading] = useState(true);

    const raw_player = player_json.player;
    const player = raw_player.body[0]
    const logo = team_dict[player.team];
    const id = player.espnID;

    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         const storedYear = sessionStorage.getItem("year");
    //         if (storedYear) {
    //             setYear(storedYear);
    //         }
    //     };
    //     // Listen for sessionStorage changes
    //     window.addEventListener("storage", handleStorageChange);
    //     // Cleanup listener on unmount
    //     handleStorageChange()
    //     return () => {
    //         window.removeEventListener("storage", handleStorageChange);
    //     };
    // }, []);
    //
    // useEffect(() => {
    //     console.log(year);
    // }, [year]);

    useEffect(() => {
        const fetchPlayerData = async () => {
            setLoading(true)
            const data = await renderFantasyData(id, player.team, player.pos);
            console.log(data)
            if (data) {
                setPlayerData(data);
                const parsedPlayerStats: PlayerStats = data.player_stats;
                const rows = getRows(parsedPlayerStats);
                setRows(rows)
                const cols = getCols(data.player_pos || "WR");
                setCols(cols)
            } else {
                setPlayerData(null);
            }
            setLoading(false);
        };
        fetchPlayerData();
    }, [id, player.team, player.pos]);
    

    if (loading) {
        return <p className={"text-white center"}>Loading fantasy data...</p>;
    }
    return (
        <div>
            <div className={"container-1"}>
                <div className={"player-bio-container"}>
                    <div className={"headshot-container"}>
                        <img src={player["espnHeadshot"]} alt="Player image"/>
                    </div>
                    <div className={"bio-text-container text-white"}>
                        <span>{`${player.espnName}`}</span>
                        <br/>
                        <span>{`${player.pos}`}</span>
                        <br/>
                        <span>{`${player.team}, #${player.jerseyNum}`}</span>
                        <br/>
                        <span>{`${player.age} y/o, ${player.bDay}`}</span>
                    </div>
                    <div className={"team-image-container"}>
                        <img src={`/team_logos/${logo}-logo.png`} alt="team logo"/>
                    </div>
                </div>
            </div>
            <div className={"container-2"}>
                <div className={"data-table shadow-small"}>
                    <div className={"select-container"}>
                        <SeasonSelect/>
                    </div>
                    <RenderTable data={playerData.player_stats} rows={rows} cols={cols}/>
                </div>
            </div>
            <div className={"container-3"}>
                <div className={"line-chart shadow-small"}>
                    <RenderLineChart data={playerData.player_stats} rows={rows} cols={cols}/>
                </div>
            </div>
        </div>
    )
}

export default PlayerPage;