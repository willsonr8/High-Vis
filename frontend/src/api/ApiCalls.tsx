import React from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const getPlayerData = async (playerName: string) => {
    try {
        const response = await axios.get(`${API_URL}/player/${playerName}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get player information", error);
        throw error;
    }
};
