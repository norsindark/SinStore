import axios from 'axios'
import { BASE_URL_SERVER } from 'constant/network'
import toast, { Toaster } from 'react-hot-toast';


const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message, { duration: 2000 }, { position: 'top-right' });
    }
  }
);


async function createNewOrder(data) {
    const response = await axiosInstance.post(`${BASE_URL_SERVER}/api/v1/client/orders/create`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if(response === undefined) {
        return;
    }
    return response.data;
};

export {
    createNewOrder
};