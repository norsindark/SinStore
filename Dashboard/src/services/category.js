import axios from 'axios';
import { BASE_API } from 'constant/network';

const getCategoryList = async () => {
    try {
        const response = await axios.get(`${BASE_API}/categories`);
        return response.data;
    } catch (error) {
        console.log("Error fetching categories:", error);
        throw error;
    }
};

const updateCategory = async (categoryId, updatedCategory) => {

    try {
        await axios.put(`${BASE_API}/categories/${categoryId}`, updatedCategory);
    } catch (error) {
        console.log("Error updating category:", error);
        throw error;
    }
};

const deleteCategory = async (categoryId) => {
    try {
        await axios.delete(`${BASE_API}/categories/${categoryId}`);
    } catch (error) {
        console.log("Error deleting category:", error);
        throw error;
    }
};

const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${BASE_API}/categories`, categoryData);

        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export {
    getCategoryList,
    updateCategory,
    deleteCategory,
    createCategory
};
