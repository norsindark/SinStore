import axios from 'axios';
import bcrypt from 'bcryptjs';
import { BASE_API } from 'constant/network';
import { BASE_URL_SERVER } from '../constant/network'


const updateUser = async (editingUser, formData, setIsModalOpen, setEditingUser) => {
    const isConfirmed = window.confirm("Are you sure you want to save these changes?");
    if (isConfirmed) {
        try {
            await axios.put(`${BASE_URL_SERVER}/api/v1/client/user/update/${editingUser.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            setIsModalOpen(false);
            setEditingUser(null);
            window.alert("User updated successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
};

const changePassword = async (editingUser, formData, setIsModalOpen, setEditingUser) => {
    const isConfirmed = window.confirm("Are you sure you want to save these changes?");
    if (isConfirmed) {
        try {
            await axios.put(`${BASE_URL_SERVER}/api/v1/client/user/change-password/${editingUser.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            setIsModalOpen(false);
            setEditingUser(null);
            window.alert("User updated successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
};

const updateUserPassword = async (user, newPassword) => {
    try {
        const hashedPassword = await encodePassword(newPassword);

        const updatedUser = { ...user, password: hashedPassword };

        await axios.put(`${BASE_API}/users/${user.id}`, updatedUser);

        return "Password updated successfully!";
    } catch (error) {
        console.error("Error updating user password:", error);
        throw error;
    }
};

const encodePassword = async (password) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error encoding password:', error);
        throw error;
    }
};




async function getUser() {
    try {
        const { data, error } = await axios.get(`${BASE_URL_SERVER}/api/v1/client/user/profile`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!data || error) throw new Error()

        return data
    } catch (error) {
        return null
    }
}


export {
    updateUser,
    encodePassword,
    updateUserPassword,
    getUser,
    changePassword
}