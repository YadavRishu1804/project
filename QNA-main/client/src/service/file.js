/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/getFile/';

const getFile = async (file_name, user_id, bot_name) => {

  	try {
		const response = await axios.get(`${baseUrl}?user_id=${user_id}&bot_name=${bot_name}&file_name=${file_name}`);
    	return response.data; 
  	} 	
	catch (error) {
    	console.error('Error fetching file:', error);
    	throw error; 
  	}

}

export default { getFile };