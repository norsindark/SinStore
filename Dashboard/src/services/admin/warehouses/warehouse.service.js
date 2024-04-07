import axios from 'axios'
import { BASE_URL_SERVER } from '../../../constant/network';

async function getWarehouses() {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/admin/dashboard/warehouses/all`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return response.data;
};

export { getWarehouses };