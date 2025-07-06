import React, {useEffect, useState, useMemo} from "react";
import {PlayerInfoProps} from "@/interfaces/playerInfo";
import {getSessionStorage} from "@/utils/getSessionStorage";
import {PlayerStats} from "@/interfaces/playerStats";


export default function NewPlayerPage({ player }: PlayerInfoProps): React.JSX.Element {
    const [year, setYear] = useState(getSessionStorage("year", "2025"));
    const [playerInfo, setPlayerInfo] = useState<PlayerInfoProps | null>(null);
    const [playerData, setPlayerData] = useState<PlayerStats | []>([]);
    const [playerInfoLoading, setPlayerInfoLoading] = useState<boolean>(false);

    useEffect(() => {
        sessionStorage.setItem("year", JSON.stringify(year));
    }, [year])

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
                            <img src={player["espnHeadshot"]} alt="Player image"/>
                        </div>
                        <div className={"bio-text-container text-white"}>
                            <span>{`${player.name}`}</span>
                            <br/>
                            <span>{`${player.position}`}</span>
                            <br/>
                            <span>{`${player.teamAbv}, #${player.jerseyNumber}`}</span>
                            <br/>
                            <span>{`${player.age} y/o, ${player.birthday}`}</span>
                        </div>
                        <div className={"team-image-container"}>
                            <img src={`/team_logos/${player.teamAbv}-logo.png`} alt="team logo"/>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}