/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import toast from "react-hot-toast";

function Analyze (formData, setFiles, setBotName, setIsNextClicked, navigate) {


    toast.promise(
        axios.post("http://localhost:3001/api/analyze", formData),
        {
            loading: "Uploading Files and Building the Bot ...",
            success: (botReadyResponse) => {
                setFiles([]);
                setBotName("");
                setIsNextClicked(false);
                if (botReadyResponse.data.botReady) { navigate('/bot-chat') }
                return "Bot is ready to use";
            },
            error: (err) => { return "Error building bot: " + err.message }
        },
        {
            style: { minWidth: "250px" }
        }
    );
}

export {Analyze};