import axios from "axios"
// import { baseUrl } from "constants";
// export const baseUrl = "http://localhost:8000/api/"
export const baseUrl = "https://50d8-105-161-230-231.ngrok-free.app/api/"


export default axios.create({
    baseUrl: baseUrl,
});
