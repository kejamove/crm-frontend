import axios from "axios"
// import { baseUrl } from "constants";
// export const baseUrl = "https://16.16.127.250/api/"
// export const baseUrl = "http://localhost:4000/api/"
export const baseUrl = "https://crm-node-api-38131eb86996.herokuapp.com/api/"
// export const baseUrl = "https://test.kejadigital.com/api/"
// export const baseUrl = "https://kejacrm-api-0d785412ff3f.herokuapp.com/api/"
// export const baseUrl = "https://secure-brushlands-73777-bf5e5d7d211f.herokuapp.com/api/"


export default axios.create({
    baseUrl: baseUrl,
});
