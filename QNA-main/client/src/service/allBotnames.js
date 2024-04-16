/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/allBotnames/';

const getAllBotnames = async (user_id) => {
    try {
        const response = await axios.get(`${baseUrl}?user_id=${user_id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching bot names:', error);
        throw error;
    }
}

export default { getAllBotnames };