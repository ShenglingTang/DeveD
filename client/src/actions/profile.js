import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

import { 
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS, 
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
    
} from "./types";

//get the current user profile
export const getCurrentProfile = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {

        const res = await axios.get('/api/profile/me');

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });        
    }
};

//get all profiles
export const getProfiles = () => async dispatch => {
    
    try {

        const res = await axios.get('/api/profile');

        dispatch ({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });        
    }
};

//get profile by user ID
export const getProfileById = (userId) => async dispatch => {

    // if (localStorage.token) {
    //     setAuthToken(localStorage.token);
    // }
    
    try {

        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });        
    }
};

//get Github repos
export const getGithubRepos = (username) => async dispatch => {

    // if (localStorage.token) {
    //     setAuthToken(localStorage.token);
    // }
    
    try {

        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch ({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });        
    }
};

//create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    // if (localStorage.token) {
    //     setAuthToken(localStorage.token);
    // }
    
    try {
        const res = await axios.post('/api/profile', formData);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) { //validation errors
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
};

//add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const res = await axios.put('/api/profile/experience', formData);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Experience Added', 'success'));
        
        history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) { //validation errors
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
};

//add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const res = await axios.put('/api/profile/education', formData);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Education Added', 'success'));
        
        history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) { //validation errors
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
};

//delete experience
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience removed', 'success'));
    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
};

//delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education removed', 'success'));
    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
};

//delete account & remove profile
export const deleteAccount = () => async dispatch => {

    if (window.confirm('Are you sure? This can NOT be undone.')) {
        try {
            const res = await axios.delete(`/api/profile`);
    
            dispatch({
                type: CLEAR_PROFILE
            });
    
            dispatch({
                type: ACCOUNT_DELETED
            });
    
            dispatch(setAlert('Account removed'));
        } catch (err) {
            
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });   
        }    
    }
    
};