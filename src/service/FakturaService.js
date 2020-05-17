import axios from 'axios';
import AuthService from './AuthService';
import {FakturaController_delete, FakturaController_getById, FakturaController_listFaktura, FakturaController_save, FakturaController_update, FakturaController_getByYear} from '../infrastucture/ApiRoutes';


class FakturaServive {

    fetchFaktury(pageNo = 0, pageSize = 10, sort=[{sortBy: "id", sortAsc: true}]) {
        return axios.post(process.env.REACT_APP_URL + FakturaController_listFaktura(pageNo,pageSize), sort, AuthService.getAuthHeader());
    }
W
    fetchFakturaById(id) {
        return axios.get(process.env.REACT_APP_URL + FakturaController_getById(id), AuthService.getAuthHeader());
    }

    fetchFakturyInfoByYear(year) {
        return axios.get(process.env.REACT_APP_URL + FakturaController_getByYear(year), AuthService.getAuthHeader());
    }

    deleteFaktura(id) {
        return axios.delete(process.env.REACT_APP_URL + FakturaController_delete(id), AuthService.getAuthHeader());
    }

    addFaktura(faktura) {
        return axios.post(process.env.REACT_APP_URL + FakturaController_save, faktura, AuthService.getAuthHeader());
    }

    editFaktura(id, faktura) {
        return axios.put(process.env.REACT_APP_URL + FakturaController_update(id), faktura, AuthService.getAuthHeader());
    }

}

export default new FakturaServive();
