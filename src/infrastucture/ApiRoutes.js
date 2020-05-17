export const AuthenticationController_generateToken = `/token/generate-token`
export const AuthenticationController_logout = `/token/logout`
export const FakturaController_listFaktura = (pageNo, pageSize, sort) => `/invoices?pageNo=${pageNo}&pageSize=${pageSize}`
export const FakturaController_getById = (id) => `/invoices/${id}`
export const FakturaController_getByYear = (year) => `/invoices/between/${year}`
export const FakturaController_save =  `/invoices/save`
export const FakturaController_delete = (id) => `/invoices/${id}`
export const FakturaController_update = (id) => `/invoices/${id}`
export const OdberatelController_listOdberatel = (pageNo, pageSize, sortAsc, sortBy) => `/subscribers?pageNo=${pageNo}&pageSize=${pageSize}&sortAsc=${sortAsc}&sortBy=${sortBy}`
export const OdberatelController_getById = (id) => `/subscribers/${id}`
export const OdberatelController_getByFirma = (firma) => `/subscribers/startsWith/%7Bfirma%7D?firma=${firma}`
export const OdberatelController_save =  `/subscribers`
export const OdberatelController_delete = (id) => `/subscribers/${id}`
export const OdberatelController_update = (id) => `/subscribers/${id}`
export const UserController_listUser = `/users`
export const UserController_getOne = (id) => `/users/${id}`
export const UserController_save =  `/users`
export const UserController_delete = (id) => `/users/${id}`
export const UserController_update = (id) => `/users/${id}`
