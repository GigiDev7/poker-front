import axios from "axios";
import { BASE_URL_PROD } from "../config";

axios.defaults.withCredentials = true;

const login = async (email: string, password: string) =>
  axios.post(
    `${BASE_URL_PROD}/login`,
    { email, password }
    //{ withCredentials: true }
  );

const register = async (userData: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}) => axios.post(`${BASE_URL_PROD}/register`, userData);

const logout = async () => axios.post(`${BASE_URL_PROD}/logout`);

export default { login, register, logout };
