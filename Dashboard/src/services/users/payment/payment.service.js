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

async function paymentCallback() {
    const url = window.location.href;
    const queryString = url.substring(url.indexOf("?") + 38);
    const response = await axiosInstance.get(`${BASE_URL_SERVER}/api/v1/client/payment/vnpay-return?${queryString}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (response === undefined) {
        return;
    }
    console.log(response.data);
};


export {
    paymentCallback
};