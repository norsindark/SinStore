import axios from 'axios'
import { BASE_URL_SERVER } from 'constant/network';
import toast, { Toaster } from 'react-hot-toast';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status !== 200) {
            toast.error(error.response.data.message, { duration: 2000 }, { position: 'top-right' });
        }
    }
);


async function getOrders() {
    const response = await axiosInstance.get(`${BASE_URL_SERVER}/api/v1/client/orders/all`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return response.data;
};

async function updateOrderStatus(data) {
    console.log(data);
    const status = data.status;
    const response = await axiosInstance.put(`${BASE_URL_SERVER}/api/v1/client/orders/update/${data.id}`, { status }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (response === undefined) {
        return;
    }
    return response.data;
};

export {
    getOrders,
    updateOrderStatus
};