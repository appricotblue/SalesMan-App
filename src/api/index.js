import { env_dev } from "../env/Dev";
import axios from "axios";

const HTTP_REQUEST = axios.create({
  baseURL: env_dev,
});

// export const login = async (PAYLOAD) => HTTP_REQUEST.get("admin/admin/singup",PAYLOAD);
export const login = async (username, password) => {
  try {
    const response = await HTTP_REQUEST.post("/user/userlogin", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getOrderslist/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShops = async () => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getshops`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getShopDetails = async (shopId) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getshopsDetails/${shopId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getItems = async () => {
  try {
    const response = await HTTP_REQUEST.get(`user/getItems`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (userId) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getuserprofile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trial = async (PAYLOAD) =>
  HTTP_REQUEST.post("/user-home-screen/", PAYLOAD);
