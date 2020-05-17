import axios from 'axios';
import AuthService from './AuthService';
import config from '../infrastucture/config';
import {UserController_listUser, UserController_delete, UserController_getOne, UserController_save, UserController_update} from '../infrastucture/ApiRoutes';


class UserService {

    fetchUsers() {
        return axios.get(config.API_BASE_URL + UserController_listUser, AuthService.getAuthHeader());
    }

    fetchUserById(userId) {
        return axios.get(config.API_BASE_URL + UserController_getOne(userId), AuthService.getAuthHeader());
    }

    deleteUser(userId) {
        return axios.delete(config.API_BASE_URL + UserController_delete(userId), AuthService.getAuthHeader());
    }

    addUser(user) {
        return axios.post(config.API_BASE_URL + UserController_save, user, AuthService.getAuthHeader());
    }

    editUser(user) {
        return axios.put(config.API_BASE_URL + UserController_update(user.id), user, AuthService.getAuthHeader());
    }

}

export default new UserService();
