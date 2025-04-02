import axios from 'axios';

const USER_API_BASE_URL = "https://employeeservicebackend-copy-production.up.railway.app/api/auth";

class UserService {

    registerUser(user){
        return axios.post(USER_API_BASE_URL + '/register',user);
    }

    loginUser(user){
        return axios.post(USER_API_BASE_URL + '/login',user);
    }
}

export default new UserService()