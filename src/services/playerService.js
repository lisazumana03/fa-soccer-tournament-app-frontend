import axios from 'axios';

const API_BASE_URL = 'http://localhost:2931/api/player';

export const getAllPlayers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

export const getPlayerById = async (playerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${playerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching player with ID ${playerId}:`, error);
        throw error;
    }
};

export const createPlayer = async (playerData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, playerData);
        return response.data;
    } catch (error) {
        console.error('Error creating player:', error);
        throw error;
    }
};  

export const updatePlayer = async (playerId, playerData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update/${playerId}`, playerData);    
        return response.data;
    } catch (error) {
        console.error(`Error updating player with ID ${playerId}:`, error);
        throw error;
    }
};

export const deletePlayer = async (playerId) => {
    try {
        await axios.delete(`${API_BASE_URL}/delete/${playerId}`);
    } catch (error) {
        console.error(`Error deleting player with ID ${playerId}:`, error);
        throw error;
    }
};

