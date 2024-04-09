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

export const getOrders = async (userId, pageNumber) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getOrderslist/${userId}?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDeliveries = async (userId, pageNumber) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getDeliveries/${userId}?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShops = async (pageNumber) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getshops?page=${pageNumber}`);
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

export const getItems = async (pageNumber) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getItems?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEarnings = async (userId, pageNumber) => {
  console.log(userId, pageNumber, 'earningsd')
  try {
    const response = await HTTP_REQUEST.get(`/user/getEarning?userId=${userId}&page=${pageNumber}`);
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

export const getItemSearch = async (searchkey) => {
  try {
    const response = await HTTP_REQUEST.get(`user/searchitem?keyword=${searchkey}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderSearch = async (searchkey) => {
  try {
    const response = await HTTP_REQUEST.get(`user/searchorder?keyword=${searchkey}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getShopSearch = async (searchkey) => {
  try {
    const response = await HTTP_REQUEST.get(`user/searchshop?keyword=${searchkey}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReturnOrder = async (userId) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getuserprofile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trial = async (PAYLOAD) =>
  HTTP_REQUEST.post("/user-home-screen/", PAYLOAD);
