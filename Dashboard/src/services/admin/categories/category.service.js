import axios from 'axios'
import { BASE_URL_SERVER } from '../../../constant/network';
async function getCategories() {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/admin/dashboard/categories/all`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return response.data;
};

async function updateCategory(data) {
    console.log(data.name);
    const response = await axios.put(`${BASE_URL_SERVER}/api/v1/admin/dashboard/categories/update/${data.id}`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return response.data;
};

async function deleteCategory(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) {
        return;
    }
    const response = await axios.delete(`${BASE_URL_SERVER}/api/v1/admin/dashboard/categories/delete/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        }
    });
    return response.data;
};

async function addNewCategory(data) {
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/admin/dashboard/categories/add`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data;
};

export { getCategories, updateCategory, deleteCategory, addNewCategory };