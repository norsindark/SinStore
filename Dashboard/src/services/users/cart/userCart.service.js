import axios from 'axios'
import { BASE_URL_SERVER } from 'constant/network'


async function addCartItem(data) {
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/client/user/cart-item/add`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });

    return response.data;
};

async function removeCartItem(data) {
    console.log(data);
    const response = await axios.delete(`${BASE_URL_SERVER}/api/v1/client/user/cart-item/remove/${data}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
    });
    return response.data;
};

export {
    addCartItem,
    removeCartItem,
};