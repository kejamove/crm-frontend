import axios from "axios"
// import { baseUrl } from "constants";
// export const baseUrl = "http://localhost:8000/api/"
export const baseUrl = "https://91ad-105-163-42-119.ngrok-free.app/api/"


export default axios.create({
    baseUrl: baseUrl,
});
