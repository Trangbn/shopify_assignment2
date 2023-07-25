import axios from "axios";
import {authStorage} from "../storage/auth-storage";

export const axiosConfig = axios.create();

axiosConfig.defaults.headers['Authorization'] = authStorage.get();
