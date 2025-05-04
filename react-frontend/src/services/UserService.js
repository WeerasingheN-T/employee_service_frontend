import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/auth";

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