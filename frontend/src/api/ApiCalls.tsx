import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const getPlayerData = async (playerName: string) => {
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
        const response = await axios.get(`${API_URL}/player/player_stats`, {
            params: { player_id: playerID, team: team }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get fantasy stats", error);
        return null;
    }
};
