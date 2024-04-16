/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/deleteBotname/';

const deleteBotname = async (user_id, bot_name) => {
    try {
        const response = await axios.delete(`${baseUrl}?user_id=${user_id}&bot_name=${bot_name}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting bot name:', error);
        throw error;
    }
};

export default { deleteBotname };