import axios from 'axios'
import { BASE_URL_SERVER } from '../../../constant/network';

async function getUsers() {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/admin/dashboard/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });

    return response.data;
};

async function getUserById(id) {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/admin/dashboard/users/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });

    return response.data;
};

async function updateUser(data) {
    const response = await axios.put(`${BASE_URL_SERVER}/api/v1/admin/dashboard/user/${data.id}`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    if (response.status !== 200) {
        window.alert("Error updating user");
    } else {
        window.alert(response.data.message);
    }
    return response.data;
}

async function deleteUser(id) {
    const isConfirmed = window. confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
        return;
    }
    const response = await axios.delete(`${BASE_URL_SERVER}/api/v1/admin/dashboard/user/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        }
    });

    if (response.status !== 200) {
        window.alert("Error deleting user");
    } else {
        window.alert(response.data.message);
    }
};




export { getUsers, updateUser, deleteUser, getUserById};
