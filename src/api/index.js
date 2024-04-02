import { env_dev } from "../env/Dev";
import axios from "axios";

const HTTP_REQUEST = axios.create({
  baseURL: env_dev,
});

// export const login = async (PAYLOAD) => HTTP_REQUEST.get("admin/admin/singup",PAYLOAD);
export const login = async (email, password) => {
  try {
    const response = await HTTP_REQUEST.post("/admin/admin/singup", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trial = async (PAYLOAD) =>
  HTTP_REQUEST.post("/user-home-screen/", PAYLOAD);
