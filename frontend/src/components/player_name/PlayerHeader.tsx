import {getTeamName} from "@/utils/teamMap";
import React from "react";
import {PlayerInfoProp} from "@/interfaces/playerInfo";
import {getFullTeamName} from "@/utils/fullTeamNameMap";

export default function PlayerHeader({ player } : PlayerInfoProp) {

    return (
        <div className={"player-bio-container"}>
            <div className={"headshot-container"}>
                <img src={player["espnHeadshot"]} alt="player image"/>
            </div>
            <div className={"bio-text-container"}>
                <div className={"player-name-container aldrich"}>
                    <span className={"player-name"}>{`${player.name}`}</span>
                </div>
                <div className={"player-details-container"}>
                    <span>{`Position: ${player.position}`}</span>
                    <br/>
                    <span>{`School: ${player.school}`}</span>
                    <br/>
                    <span>{`Team: ${getFullTeamName(player.teamAbv)}, #${player.jerseyNum}`}</span>
                    <br/>
                    <span>{`Age: ${player.age} y/o, born ${player.birthday}`}</span>
                    <br/>
                    <span>{`H/W: ${player.height}, ${player.weight} lbs`}</span>
                    <br/>
                    <span>{`NFL Seasons: ${player.experience}`}</span>
                </div>
            </div>
            <div className={"team-image-container"}>
                <img className={"logo"} src={`/team_logos/${getTeamName(player.teamAbv)}-logo.png`} alt="team logo image"/>
            </div>
        </div>
    )
}