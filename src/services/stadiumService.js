//the script that will handle all API calls related to stadiums, such as fetching stadium data, creating new stadiums, updating existing stadiums, and deleting stadiums. This service will be used by the Stadium components to interact with the backend API.

import axios from "axios";

const API_BASE_URL = "http://localhost:2931/api/stadiums"; // Update with your backend URL

export const getStadiums = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching stadiums:", error);
        throw error;
    }
}

export const getStadiumById = async (stadiumId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${stadiumId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching stadium with ID ${stadiumId}:`, error);
        throw error;
    }
}

export const createStadium = async (stadiumData) => {
    try {
        const response = await axios.post(API_BASE_URL, stadiumData);
        return response.data;
    } catch (error) {
        console.error("Error creating stadium:", error);
        throw error;
    }