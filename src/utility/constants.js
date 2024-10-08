export const baseUrl = "https://kejacrm-api-0d785412ff3f.herokuapp.com/api/"

export const headers = {
    "Content-Type": "application/json",
};
export const userType = JSON.parse(localStorage.getItem("authData"))?.user?.role;
export const activeUser = JSON.parse(localStorage.getItem("authData"))?.user;

const projectName = 'KEJA FRONTEND'