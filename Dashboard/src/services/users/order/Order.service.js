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

async function paymentOrder(data) {
  const { userId,
    fullName,
    country,
    city,
    address,
    postalCode,
    phone,
    email,
    notes } = data;

  const accessToken = localStorage.getItem('accessToken');
  const headers = { 'Authorization': `Bearer ${accessToken}` };

  const queryParams = new URLSearchParams({
    userId,
    fullName,
    country,
    city,
    address,
    postalCode,
    phone,
    email,
    notes
  }).toString();

  const url = `${BASE_URL_SERVER}/api/v1/client/payment/create-payment-url?${queryParams}`;

  try {
    const response = await axiosInstance.get(url, { headers });
    // console.log(response.data);
    window.location.href = response.data;

  } catch (error) {
    console.error('Error:', error);
  }
}


async function createNewOrder(data) {
  const response = await axiosInstance.post(`${BASE_URL_SERVER}/api/v1/client/orders/create`, data, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  });
  if (response === undefined) {
    return;
  }
  return response.data;
};

export {
  createNewOrder,
  paymentOrder,
};