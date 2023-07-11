import React from "react";
import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const MainApi = {

    getPlayList : async() => {
        return await axios.get(`/playList/all`);
    },

    searchPlayList : async(keywordArr) => {
        const keyword = {
            keywords : keywordArr
        };
        return await axios.post(`/playList/search`, keyword);
    }
}

export default MainApi;