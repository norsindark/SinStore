import axios from 'axios'
import { BASE_URL_SERVER } from '../../../constant/network';

async function getProducts() {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/auth/products/all`);
    return response.data;
}

async function updateProduct(data) {
    console.log(data);
    const response = await axios.put(`${BASE_URL_SERVER}/api/v1/admin/dashboard/products/update/${data.id}`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data;
}

async function deleteProduct(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) {
        return;
    }
    const response = await axios.delete(`${BASE_URL_SERVER}/api/v1/admin/dashboard/products/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data;
};

async function addNewProduct(data) {
    const isConfirmed = window.confirm("Are you sure you want to add this product?");
    if (!isConfirmed) {
        return;
    }
    console.log(data);
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/admin/dashboard/products/add`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return response.data;
};

export { getProducts, updateProduct, deleteProduct, addNewProduct };