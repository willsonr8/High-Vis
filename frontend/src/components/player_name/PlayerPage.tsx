import React, { useState, useEffect } from "react";
import {getFantasyPlayerStats} from "@/api/ApiCalls";
import RenderTable from "@/components/player_name/Table";

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

const renderFantasyData = async (player_id: string, team: string) => {
    const playerData = await getFantasyPlayerStats(player_id, team);
    if (playerData !== null) {
      return playerData
    }
    else {
      return "Cannot validate player data"
    }
  };

const PlayerPage = ({player_json}) => {
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const raw_player = JSON.parse(player_json.player);
    const player = raw_player.body[0]
    const logo = team_dict[player.team];
    const id = player.espnID;

    useEffect(() => {
        const fetchPlayerData = async () => {
            const data = await renderFantasyData(id, player.team);
            if (data) {
                setPlayerData(data);
            } else {
                setPlayerData(null);
            }
            setLoading(false);
        };
        fetchPlayerData();
    }, [id, player.team]);

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
                <RenderTable data={playerData}/>
                {/*{JSON.stringify(playerData, null, 2)}*/}
            </div>
        </div>
    )
}

export default PlayerPage;