import axios from 'axios';

//when we have a token, we just send it with every request, instead of picking and choosing which request to send it with

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        // localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        // localStorage.removeItem('token');
    }
};

export default setAuthToken;