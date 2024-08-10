import React from "react";

const PlayerPage = ({player}) => {
    console.log(player)
    if (!player) {
        return <p className={"text-white center"}>Loading player data...</p>;
    }
    return (
        <div>
            <div className={"container-1"}>
                <div className={"player-bio-container"}>
                    <div className={"headshot-container"}>
                        <img src={player["espnHeadshot"]} alt="Player image"/>.
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
                        <img src={"/team_logos/bears-logo.png"} alt="team logo"/>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerPage;