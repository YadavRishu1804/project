/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/response';

const getUserResponse = async (userId, botname, userPrompt) => {
	try {
		const response = await axios.get(`${baseUrl}?user_id=${userId}&bot_name=${botname}&user_prompt=${userPrompt}`);
		return response.data; // Assuming the response contains the data you need
  	} 
  	catch (error) {
		console.error('Error fetching user response:', error);
		throw error; // Handle errors appropriately
  	}
};

export default { getUserResponse };