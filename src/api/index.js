import { env_dev } from "../env/Dev";
import axios from "axios";

const HTTP_REQUEST = axios.create({
  baseURL: env_dev,
});


// export const login = async (PAYLOAD) => HTTP_REQUEST.get("admin/admin/singup",PAYLOAD);
export const login = async (username, password) => {
  try {
    console.log(env_dev + '/user/userlogin')
    const response = await HTTP_REQUEST.post("/user/userlogin", { username, password });
    return response.data;
  } catch (error) {
    console.log(error, 'tesrr')
    throw error;
  }
};

export const getOrders = async (userId, routeid, pageNumber) => {
  console.log(userId, routeid, pageNumber, 'itemsss')
  try {
    const response = await HTTP_REQUEST.get(`/user/getOrderslist/${userId}/${routeid}?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getOrderDetails/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReturnOrderDetails = async (orderId) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getReturnOrderDetails/${orderId}`);
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

export const getShops = async (userId, pageNumber) => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getshops/${userId}?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const CreateShop = async (userId) => {
//   try {
//     const response = await HTTP_REQUEST.get(`/user/createshop/${userId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const createShopAPI = async (userId, formData) => {
  console.log(userId, formData, 'api calll ')
  try {
    const response = await HTTP_REQUEST.post(
      `user/createshop/${userId}`,
       formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data; // Handle the response data as needed (success message, error handling)
  } catch (error) {
    console.error('Error creating shop 123:', error?.message);
    throw error; // Re-throw the error for further handling if needed
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

export const getOrderStatus = async () => {
  try {
    const response = await HTTP_REQUEST.get(`user/getStatus`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShopLists = async (userId) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getShops/${userId}?page=1`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getShopItems = async () => {
  try {
    const response = await HTTP_REQUEST.get(`getItems?page=1`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getLocationList = async () => {
  try {
    const response = await HTTP_REQUEST.get(`/user/getLocation`);
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

export const getReturnSearch = async (searchkey) => {
  try {
    const response = await HTTP_REQUEST.get(`user/returnOrderssearch?keyword=${searchkey}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReturnOrder = async (userId) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getReturnOrder/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderbyShopDate = async (datetype, shop, fromDate, toDate) => {
  console.log(datetype,shop, fromDate, toDate, 'orderbydate')
  try {
    // filterbydate?filter=custom&startDate=2024-04-27&endDate=2024-04-29&shopName=testing1
    // const response = await HTTP_REQUEST.get(`user/searchAndFilterShops?shopName=${shop}&fromDate=${fromDate}&toDate=${toDate}`);
    const response = await HTTP_REQUEST.get(`user/filterbydate?filter=${datetype}&shopName=${shop}&startDate=${fromDate}&endDate=${toDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalsales = async (userId) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getTotalItemSales?${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEarningDetails = async (orderId) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getEarningOrderItems/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getfilterBydate = async (filter) => {
  try {
    const response = await HTTP_REQUEST.get(`user/filterbydate`, { filter });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRoute = async (userId) => {
  try {
    const response = await HTTP_REQUEST.get(`user/getUserRoute/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const trial = async (PAYLOAD) =>
  HTTP_REQUEST.post("/user-home-screen/", PAYLOAD);


