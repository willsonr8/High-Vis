"use client"
import React from 'react';
import NavBar from "@/components/NavBar";
import PlayerPage from "@/components/player_name/PlayerPage";
import { useState, useEffect } from "react";


const PlayerHome: React.FC = () => {
    const [player, setPlayer] = useState(null)
    useEffect(() => {
        const storedPlayer = sessionStorage.getItem('player');
        if(storedPlayer) {
            setPlayer(JSON.parse(storedPlayer))
        }
    }, [])
    console.log(player)
    return (
        <div className={"all-container"}>
            <NavBar/>
            {player ? (
                <div className={"all-player-page-container text-white"}>
                    <PlayerPage player_json={player}/>
                </div>
            ) : (
                <p className={"text-white"}>Loading player data...</p>
            )}
        </div>
    )
}

export default PlayerHome;