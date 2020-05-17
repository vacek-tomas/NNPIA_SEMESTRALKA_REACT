import axios from 'axios';
import config from '../infrastucture/config';
import {AuthenticationController_generateToken} from '../infrastucture/ApiRoutes';

class AuthService {

    login(credentials){
        return axios.post(config.API_BASE_URL + AuthenticationController_generateToken, credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
    }

    logOut() {
        localStorage.removeItem("userInfo");
    }
}

export default new AuthService();
