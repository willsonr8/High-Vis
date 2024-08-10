import React from "react";

const PlayerPage = ({player}) => {
    console.log(player)
    if (!player) {
        return <p className={"text-white center"}>Loading player data...</p>;
    }
    return (
        <div>
            <div className={"player-container"}>
                <p className={"text-white center"}>
                    {`Hello World! This is the player page for ${player.espnName}.`}
                </p>
                <div className={"headshot-container"}>
                    <img src={player["espnHeadshot"]} alt="Player image"/>.
                </div>
            </div>
        </div>
    )
}

export default PlayerPage;