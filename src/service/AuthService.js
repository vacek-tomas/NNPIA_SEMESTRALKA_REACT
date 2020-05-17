import axios from 'axios';
import {AuthenticationController_generateToken} from '../infrastucture/ApiRoutes';

class AuthService {

    login(credentials){
        return axios.post(process.env.REACT_APP_URL + AuthenticationController_generateToken, credentials);
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
