import axios from 'axios';
import AuthService from './AuthService';
import {
    OdberatelController_delete,
    OdberatelController_getByFirma,
    OdberatelController_getById,
    OdberatelController_listOdberatel,
    OdberatelController_save,
    OdberatelController_update
} from '../infrastucture/ApiRoutes';


class OdberatelService {

    fetchOdberatele(pageNo = 0, pageSize = 10, sortAsc = true, sortBy = "id") {
        return axios.get(process.env.REACT_APP_URL + OdberatelController_listOdberatel(pageNo, pageSize, sortAsc, sortBy), AuthService.getAuthHeader());
    }

    fetchOdberatelById(id) {
        return axios.get(process.env.REACT_APP_URL + OdberatelController_getById(id), AuthService.getAuthHeader());
    }

    fetchOdberatelByFirma(firma) {
        return axios.get(process.env.REACT_APP_URL + OdberatelController_getByFirma(firma), AuthService.getAuthHeader());
    }

    deleteOdberatel(id) {
        return axios.delete(process.env.REACT_APP_URL + OdberatelController_delete(id), AuthService.getAuthHeader());
    }

    addOdberatel(odberatel) {
        return axios.post(process.env.REACT_APP_URL + OdberatelController_save, odberatel, AuthService.getAuthHeader());
    }

    editOdberatel(id, odberatel) {
        return axios.put(process.env.REACT_APP_URL + OdberatelController_update(id), odberatel, AuthService.getAuthHeader());
    }

}

export default new OdberatelService();
