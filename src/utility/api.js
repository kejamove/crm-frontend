import axios from "axios"
// import { baseUrl } from "constants";
// export const baseUrl = "https://16.16.127.250/api/"
export const baseUrl = "http://localhost:8000/api/"
// export const baseUrl = "https://test.kejadigital.com/api/"


export default axios.create({
    baseUrl: baseUrl,
});
