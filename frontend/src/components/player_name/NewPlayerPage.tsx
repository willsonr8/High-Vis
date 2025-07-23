import React, {useEffect, useState, useMemo} from "react";
import {PlayerInfo, PlayerInfoProp} from "@/interfaces/playerInfo";
import {getSessionStorage} from "@/utils/getSessionStorage";
import {EmptyPlayerStats, NewPlayerStats, PlayerStats} from "@/interfaces/playerStats";
import {getTeamName} from "@/utils/teamMap";
import SeasonSelect from "@/components/player_name/Select";
import RenderTable from "@/components/player_name/Table";
import RenderNewTable, {StatKey} from "@/components/player_name/NewTable"
import DataToggle from "@/components/player_name/DataToggle";
import RenderLineChart from "@/components/player_name/LineChart";
import {getFantasyPlayerStats} from "@/api/ApiCalls";


export default function NewPlayerPage({ player } : PlayerInfoProp): React.JSX.Element {
    const [playerID, setPlayerID] = useState<string | null>(null)
    const [position, setPosition] = useState<string>("")
    const [year, setYear] = useState("2024");
    const [playerData, setPlayerData] = useState<PlayerStats>(EmptyPlayerStats());
    const [playerInfoLoading, setPlayerInfoLoading] = useState<boolean>(true);
    const [playerDataLoading, setPlayerDataLoading] = useState<boolean>(true);
    const [selectionKey, setSelectionKey] = useState<StatKey>("PPR");
    const [isLineGraphLoading, setIsLineGraphLoading] = useState(true)

    // kills header loading screen when player populates
    useEffect(()=> {
        setPlayerInfoLoading(true)
        if (player) {
            setPlayerInfoLoading(false)
            setPlayerID(player.playerId)
            setPosition(player.position)
        }
    }, [player]);

    useEffect(() => {
        console.log(selectionKey)
        setIsLineGraphLoading(true)
        if (selectionKey) {
            setIsLineGraphLoading(false)
        }
    }, [selectionKey])

    useEffect(() => {
    if (playerID) {
        setPlayerDataLoading(true);
        const fetchData = async () => {
            try {
                const response = await getFantasyPlayerStats(playerID, year);
                const newPlayerData = NewPlayerStats(response);
                newPlayerData.position = position;
                setPlayerData(newPlayerData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            finally {
                setPlayerDataLoading(false);
            }
        };
        fetchData();
    }}, [playerID, year, position]);

    useEffect(() => {
        if (playerData != null) {
            setPlayerDataLoading(false)
            setIsLineGraphLoading(false)
        }
    }, [playerData])

    return (
        <div>
            <div className={"container-1"}>
                {playerInfoLoading ? (
                    <div className={"text-white text-center"}>
                        Loading ...
                    </div>
                ) : (
                    <div className={"player-bio-container"}>
                        <div className={"headshot-container"}>
                            <img src={player["espnHeadshot"]} alt="player image"/>
                        </div>
                        <div className={"bio-text-container text-white"}>
                            <span>{`${player.name}`}</span>
                            <br/>
                            <span>{`${player.position}`}</span>
                            <br/>
                            <span>{`${player.teamAbv}, #${player.jerseyNum}`}</span>
                            <br/>
                            <span>{`${player.age} y/o, ${player.birthday}`}</span>
                        </div>
                        <div className={"team-image-container"}>
                            <img src={`/team_logos/${getTeamName(player.teamAbv)}-logo.png`} alt="team logo image"/>
                        </div>
                    </div>)}
            </div>
            <div className={"container-2"}>
                {playerDataLoading ? (
                    <div className={"text-white text-center"}>
                        Loading ...
                    </div>
                ) : (
                    <div className={"data-table shadow-small"}>
                        <div className={"select-container"}>
                            <SeasonSelect year={year} setYear={setYear}/>
                        </div>
                        <RenderNewTable playerStats={playerData}/>
                    </div>)}
            </div>
            <div className={"container-3"}>
                {playerDataLoading ? (
                    <div className={"text-white text-center"}>
                        Loading ...
                    </div>
                ) : (
                    <div className={"line-chart shadow-small"}>
                        <div className={"select-container"}>
                            <DataToggle position={position} setSelectionKey={setSelectionKey}/>
                        </div>
                        {isLineGraphLoading ? (
                            <div className={"text-white text-center"}>
                                Loading ...
                            </div>
                        ) : (
                            <RenderLineChart selectionKey={selectionKey} data={playerData.games}/>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}