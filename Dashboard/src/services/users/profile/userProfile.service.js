import axios from 'axios';
import { BASE_URL_SERVER } from 'constant/network'

async function updateUserProfile(editingUser, data) {
    const response = await axios.put(`${BASE_URL_SERVER}/api/v1/client/user/update/${editingUser}`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response;
};

async function uploadAvatar(id,data) {
    const response = await axios.put(`${BASE_URL_SERVER}/api/v1/client/user/update-avatar/${id}`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    return response;
}

export {
    updateUserProfile,
    uploadAvatar,
}