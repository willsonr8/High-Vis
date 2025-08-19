"use client"
import React from 'react';
import NavBar from "@/components/NavBar";
import {useState, useEffect} from "react";
import NewPlayerPage from "@/components/player_name/NewPlayerPage";
import {PlayerInfoProp} from "@/interfaces/playerInfo";
import {useSearchParams} from 'next/navigation';
import {getPlayerBio} from '@/api/ApiCalls';

const PlayerHome: React.FC = () => {
    const [player, setPlayer] = useState<PlayerInfoProp>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const searchParams = useSearchParams();
    const playerName = searchParams?.get('player-name')

    useEffect(() => {
        if (!playerName) {
            setError(true);
            setLoading(false);
            return;
        }
        setLoading(true);
        getPlayerBio(playerName)
            .then((data) => {
                if (data) {
                    setPlayer(data);
                    setError(false);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [playerName]);

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