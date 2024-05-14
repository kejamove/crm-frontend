import axios from "axios"
// import { baseUrl } from "constants";
// export const baseUrl = "http://localhost:8000/api/"
export const baseUrl = "https://dae6-102-0-4-206.ngrok-free.app/api/"


export default axios.create({
    baseUrl: baseUrl,
});
