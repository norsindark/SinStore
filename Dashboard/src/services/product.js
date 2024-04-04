import axios from 'axios';
import { BASE_API } from 'constant/network';

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_API}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const updateProduct = async (productId, updatedProductData) => {
  try {
    await axios.put(`${BASE_API}/products/${productId}`, updatedProductData);
    window.alert("Product update successfully!");
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const createProduct = async (newProductData) => {
  try {
    const response = await axios.post(`${BASE_API}/products`, newProductData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${BASE_API}/products/${productId}`);
    } catch(error) {
        console.error('Error deleting product: ', error);
        throw error;
    }
}

export {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct
};
