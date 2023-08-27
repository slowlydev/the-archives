import axios from "axios";

const httpRequest = axios.create({ baseURL: process.env.BACKEND_BASEURL })

export default httpRequest;