import { CREATE_SALON, UPDATE_SALON, FETCH_SALONS, FETCH_SALON_BY_ID, FETCH_SALON_BY_OWNER_ID, SEARCH_SALONS } from './actionTypes';
import api from '../../config/api';

const url = 'http://localhost:5000';
const API_BASE_URL = `${url}/api/salons`;

export const createSalon = (request) => async (dispatch) => {
    dispatch({ type: CREATE_SALON.REQUEST });
    try {
        const jwt = "";
        const response = await api.post(API_BASE_URL, request.salonDetails, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: CREATE_SALON.SUCCESS, payload: response.data });
        request.navigate("/salon-dashboard");
    }
    catch (error) {
        dispatch({ type: CREATE_SALON.FAILURE, payload: error.message });
    }
};

export const updateSalon = (salonId, salon, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_SALON.REQUEST });
    try {
        const token = jwt || localStorage.getItem("jwt");
        const response = await api.put(`${API_BASE_URL}/${salonId}`, salon, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: UPDATE_SALON.SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: UPDATE_SALON.FAILURE, payload: error.message });
    }
};

export const fetchSalons = () => async (dispatch) => {
    dispatch({ type: FETCH_SALONS.REQUEST });
    try {
        const response = await api.get(API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        dispatch({ type: FETCH_SALONS.SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: FETCH_SALONS.FAILURE, payload: error.message });
    }
};

export const fetchSalonById = (salonId) => async (dispatch) => {
    dispatch({ type: FETCH_SALON_BY_ID.REQUEST });
    try {
        const response = await api.get(`${API_BASE_URL}/${salonId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        dispatch({ type: FETCH_SALON_BY_ID.SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: FETCH_SALON_BY_ID.FAILURE, payload: error.message });
    }
};

export const fetchSalonByOwnerId = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_SALON_BY_OWNER_ID.REQUEST });
    try {
        const response = await api.get(`${API_BASE_URL}/owner`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: FETCH_SALON_BY_OWNER_ID.SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: FETCH_SALON_BY_OWNER_ID.FAILURE, payload: error.message });
    }
};

export const searchSalon = (jwt, city) => async (dispatch) => {
    dispatch({ type: SEARCH_SALONS.REQUEST });
    try {
        const response = await api.get(`${API_BASE_URL}/search`, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { city }
        });
        dispatch({ type: SEARCH_SALONS.SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: SEARCH_SALONS.FAILURE, payload: error.message });
    }
};



