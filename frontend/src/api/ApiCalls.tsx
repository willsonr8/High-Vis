import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const getPlayerBio = async (playerName: string) => {
    try {
        const response = await axios.get(`${API_URL}/player/player_name/${playerName}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get player information", error);
        return null;
    }
};

export const getFantasyPlayerStats = async (playerID: string, team: string) => {
    try {
        const response = await axios.get(`${API_URL}/player/player_stats/${playerID}/${team}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get fantasy stats", error);
        return null;
    }
};

export const getAllPlayers = async () => {
    try {
        const response = await axios.get(`${API_URL}/player/all_players`);
        return response.data;
    } catch (error) {
        console.error("Failed to get all players", error);
        return null;
    }
};
