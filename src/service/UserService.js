import axios from 'axios';
import AuthService from './AuthService';
import {UserController_listUser, UserController_delete, UserController_getOne, UserController_save, UserController_update} from '../infrastucture/ApiRoutes';


class UserService {

    fetchUsers() {
        return axios.get(process.env.REACT_APP_URL + UserController_listUser, AuthService.getAuthHeader());
    }

    fetchUserById(userId) {
        return axios.get(process.env.REACT_APP_URL + UserController_getOne(userId), AuthService.getAuthHeader());
    }

    deleteUser(userId) {
        return axios.delete(process.env.REACT_APP_URL + UserController_delete(userId), AuthService.getAuthHeader());
    }

    addUser(user) {
        return axios.post(process.env.REACT_APP_URL + UserController_save, user, AuthService.getAuthHeader());
    }

    editUser(user) {
        return axios.put(process.env.REACT_APP_URL + UserController_update(user.id), user, AuthService.getAuthHeader());
    }

}

export default new UserService();
