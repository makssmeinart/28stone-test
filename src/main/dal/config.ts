import axios from "axios";

export const instance = axios.create({
    baseURL: `https://financialmodelingprep.com/api/v3/`,
    params: {
        "apikey": "7dd54e030c0a69a11bf228b63ce7ec24"
    }
});
