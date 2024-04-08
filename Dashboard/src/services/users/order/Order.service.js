import axios from 'axios'
import { BASE_URL_SERVER } from 'constant/network'

async function createNewOrder(data) {
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/client/orders/create`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return response.data;
};

export {
    createNewOrder
};