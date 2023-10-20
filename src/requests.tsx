import axios from "axios";
const BASE_URL = "https://planner.rdclr.ru/api";
const API_KEY =
    "9408a4943ce1b0a0e2a1391c61bd3e513aa32bc14d8e27100e80496dd73900eb2c4f61f07b621b85347aaa2da0b4b7d29fc05dc644058354f5f58bc4de907b90742a33050135e38d97bf2ecb7a3f6848c25938e6e41df5e2623968b41ab7112cf821e6919ef92b132ce9b9490f44d4c97aaa05c6d4a0b8686c7789a493591dc7";

const getHeaders = (token = null) => {
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    } else {
        headers["Authorization"] = `Bearer ${API_KEY}`;
    }
    return headers;
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/local/register`,
            userData,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const checkUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/taken-emails/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const loginUser = async (identifier, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/local`,
            {
                identifier,
                password,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getCurrentUser = async (userToken) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/me`, {
            headers: getHeaders(userToken),
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const getAllUsers = async (userToken) => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: getHeaders(userToken),
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const createEventWithParticipants = async (eventData, userToken) => {
    try {
        const response = await axios.post(`${BASE_URL}/events`, eventData, {
            headers: getHeaders(userToken),
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const updateEventWithPhotos = async (eventId, eventData, userToken) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/events/${eventId}`,
            eventData,
            {
                headers: getHeaders(userToken),
            }
        );
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/events/${eventId}`, {
            headers: getHeaders(),
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const getPublicEvents = async (startDate, endDate) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/events?pagination[pageSize]=100&populate=*&filters[dateStart][$gte]=${startDate}&filters[dateStart][$lte]=${endDate}`
        );
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const getAuthenticatedEvents = async (startDate, endDate, userToken) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/events?populate=*&filter[date][$gte]=${startDate}&filter[date][$lte]=${endDate}`,
            {
                headers: getHeaders(userToken),
            }
        );
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const joinEvent = async (eventId, userToken) => {
    try {
        console.log(userToken)
        const response = await axios.post(
            `${BASE_URL}/events/${eventId}/join`,
            undefined,
            {
                headers: getHeaders(userToken),
            }
        );
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const leaveEvent = async (eventId, userToken) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/events/${eventId}/leave`,
            undefined,
            {
                headers: getHeaders(userToken),
            }
        );
        return response.data; 
    } catch (error) {
        throw error;
    }
};


export const getFiles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/upload/files`, {
            headers: getHeaders(),
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};

export const uploadFile = async (fileData, userToken) => {
    try {
        const response = await axios.post(`${BASE_URL}/upload`, fileData, {
            headers: {
                ...getHeaders(userToken),
                'Content-Type': 'multipart/form-data', 
            },
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};
