"use client"
import React from 'react';
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import NewPlayerPage from "@/components/player_name/NewPlayerPage";
import {PlayerInfoProp} from "@/interfaces/playerInfo";

const PlayerHome: React.FC = () => {
    const [player, setPlayer] = useState<PlayerInfoProp>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedPlayer = sessionStorage.getItem('player');
        if(storedPlayer) {
            setPlayer(JSON.parse(storedPlayer))
            setLoading(false);
        } else {
            setError(true); // Set error state if no player data is found
            setLoading(false);
        }
    }, []);
    return (
        <div className={"all-container"}>
            <NavBar/>
            {!loading && player ? (
                <div className={"all-player-page-container text-white"}>
                    <NewPlayerPage {...player}/>
                </div>
            ) : error ? (
                <p className={"text-white text-center"}>Player data not found. Please try again later.</p>
            ) : (
                <p className={"text-white text-center"}>Loading player data...</p>
            )}
        </div>
    )
}

export default PlayerHome;