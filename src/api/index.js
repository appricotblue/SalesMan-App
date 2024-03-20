import { env_dev } from "../env/Dev";
import axios from "axios";

const HTTP_REQUEST = axios.create({
  baseURL: env_dev,
});

export const login = () => HTTP_REQUEST.get("/user-wallet-details/");
export const trial = async (PAYLOAD) =>
  HTTP_REQUEST.post("/user-home-screen/", PAYLOAD);
