/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";

async function botname(user_id, bot_name, setBotName, setBotStatus) {
    const botReadyResponse = await axios.get(`http://localhost:3001/api/botname?user_id=${user_id}&bot_name=${bot_name}`);
    if (botReadyResponse.data.bot_name_exists === false) { 
        setBotStatus("available");
    }
    else { 
        setBotName("");
        setBotStatus("unavailable");
    }
}

export { botname };