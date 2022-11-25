import axios from "axios";
import { BACKEND_URL } from "../config/index";

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
