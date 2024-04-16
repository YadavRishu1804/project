/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/getHistory/';

const getBotHistory = async (userId, botName) => {

	try {
		const response = await axios.get(`${baseUrl}?user_id=${userId}&bot_name=${botName}`);
		return response.data; 
	} 

	catch (error) {
		console.error('Error fetching bot history:', error);
		throw error; // Handle errors appropriately
	}

};

export default { getBotHistory };