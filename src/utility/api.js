import axios from "axios"
// import { baseUrl } from "constants";
// export const baseUrl = "http://localhost:8000/api/"
// export const baseUrl = "https://crm-node-api-38131eb86996.herokuapp.com/api/"
export const baseUrl = "https://web-production-c5d6.up.railway.app/api/"
// export const baseUrl = "https://walrus-app-69fvy.ondigitalocean.app/api/"


export default axios.create({
    baseUrl: baseUrl,
});
