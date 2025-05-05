import axios from 'axios';

const USER_API_BASE_URL = " https://8423-2402-d000-8104-1160-f56c-54b7-d4cd-94b6.ngrok-free.app/api/auth";

class UserService {

    registerUser(user){
        return axios.post(USER_API_BASE_URL + '/register',user);
    }

    loginUser(user, param){
        return axios.post(USER_API_BASE_URL + `/logininit/${param}`,user);
    }

    verifyUser(code){
        return axios.post(USER_API_BASE_URL + `/verify`, code,
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
            }
        );
    }
}

export default new UserService()