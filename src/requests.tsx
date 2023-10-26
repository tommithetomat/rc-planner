import axios from "axios";

const BASE_URL = "https://planner.rdclr.ru/api";
const API_KEY = "YOUR_API_KEY";
const getHeaders = (token: string | null = null) => {
	const headers: { [key: string]: string } = {
		"Content-Type": "application/json",
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	} else {
		headers["Authorization"] = `Bearer ${API_KEY}`;
	}
	return headers;
};

export const registerUser = async (userData: Record<string, any>) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/auth/local/register`,
			userData
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const checkUserByEmail = async (email: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/taken-emails/${email}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const loginUser = async (identifier: string, password: string) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/local`, {
			identifier,
			password,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getCurrentUser = async (userToken: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/users/me`, {
			headers: getHeaders(userToken),
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getAllUsers = async (userToken: string | null) => {
	try {
		const response = await axios.get(`${BASE_URL}/users`, {
			headers: getHeaders(userToken),
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createEventWithParticipants = async (
	eventData: Record<string, any>,
	userToken: string
) => {
	try {
		const response = await axios.post(`${BASE_URL}/events`, eventData, {
			headers: getHeaders(userToken),
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateEventWithPhotos = async (
	eventId: number,
	eventData: Record<string, any>,
	userToken: string
) => {
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

export const deleteEvent = async (eventId: number) => {
	try {
		const response = await axios.delete(`${BASE_URL}/events/${eventId}`, {
			headers: getHeaders(),
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getPublicEvents = async (startDate: string, endDate: string) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/events?pagination[pageSize]=100&populate=*&filters[dateStart][$gte]=${startDate}&filters[dateStart][$lte]=${endDate}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getAuthenticatedEvents = async (
	startDate: string,
	endDate: string,
	userToken: string
) => {
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

export const joinEvent = async (eventId: number, userToken: string | null) => {
	try {
		if (!userToken) {
			throw new Error("User token is missing");
		}

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

export const leaveEvent = async (eventId: number, userToken: string | null) => {
	try {
		if (!userToken) {
			throw new Error("User token is missing");
		}

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

export const uploadFile = async (
	fileData: Record<string, any>,
	userToken: string
) => {
	try {
		const response = await axios.post(`${BASE_URL}/upload`, fileData, {
			headers: {
				...getHeaders(userToken),
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
