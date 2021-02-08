import axios from 'axios';

const instance = axios.create({
    headers: {
        get: {
            "Content-Type" : "application/json"
        },
    }
});

export default instance;