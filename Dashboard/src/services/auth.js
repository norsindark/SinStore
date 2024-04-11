import axios from 'axios'
import { BASE_URL_SERVER } from '../constant/network'

async function signIn(email, password) {
  try {
    const requestData = {
      email,
      password
    };
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/auth/login`, requestData);

    // console.log(response.data);

    if (!response.data) throw new Error()

    localStorage.setItem('accessToken', response.data.accessToken)
    window.alert("Login successfully");
    return response.data;
  } catch (error) {
    window.alert("Email or password is incorrect!");
    return {
      accessToken: null
    }
  }
}

async function getRoleUser(email) {
  const response = await axios.post(`${BASE_URL_SERVER}/api/v1/auth/check-role`, { email }, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  }
  );
  return response.data;
}

async function sendEmail(email) {
  try {
    console.log(email);
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/auth/reset-password?email=${email}`);

    if (!response) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
};

async function changePassword(token, password) {
  try {
    console.log(token, password);
    const response = await axios.post(`http://localhost:8080/api/v1/auth/change-password?token=${token}`, { password });
    if (!response.data) {
      throw new Error("Failed to check forgot password token");
    }
    return response.data;
  } catch (error) {
    console.error("Error checking forgot password token:", error);
    return null;
  }
};

async function register(email, password, fullName) {
  try {
    const requestData = {
      email,
      password,
      fullName
    };
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/auth/register`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });


    if (!response.data) {
      throw new Error("Failed to register");
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

export { signIn, register, getRoleUser, sendEmail, changePassword };
