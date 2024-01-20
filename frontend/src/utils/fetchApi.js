import axios from 'axios'

const BASE_URL = 'https://api.countrystatecity.in/v1/countries'

const options = {
    headers: {
        'X-CSCAPI-KEY': import.meta.env.VITE_REACT_APP_API_KEY
    }
}

export const fetchAPI = async (url) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${url}`, options);
        console.log('API Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching API:', error);
        throw error;
    }
};
