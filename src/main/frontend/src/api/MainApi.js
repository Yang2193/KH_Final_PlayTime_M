import React from "react";
import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const MainApi = {

    getPlayList : async() => {
        return await axios.get(KH_DOMAIN + `/playList/all`);
    },

    searchPlayList : async(keywordArr) => {
        const keyword = {
            keywords : keywordArr
        };
        return await axios.post(KH_DOMAIN + `/playList/search`, keyword);
    }
}

export default MainApi;