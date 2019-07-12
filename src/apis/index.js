import axios from 'axios';
import fetch from 'unfetch'

// const host_address = "http://localhost:8000";
const host_address = "http://104.248.142.244/ecommerce";
const apiUrl = `${host_address}/api/`;
const authUrl = apiUrl + 'auth';

export const getHostAddress = () => {
    return host_address;
}

export const postApi = (url, info, callback) => {
    var bodyFormData = new FormData();
    Object.keys(info).map(value => {
        bodyFormData.set(value, info[value]);
    });

    axios.post(url, bodyFormData)
    .then(function (response) {
        callback(response);
    })
    .catch(function (error) {
        callback(error);
    });
}

export const getApi = (url, params, callback) => {
    axios.get(url, {params: params})
    .then(function(response) { 
        callback(response); 
    })
    .catch(function(error) { 
        callback(error); 
    })
}

export const user_login = (userinfo, callback) => {
    const url = `${authUrl}/login`;
    var bodyFormData = new FormData();
    bodyFormData.set('username', userinfo.username);
    bodyFormData.set('password', userinfo.password);
    axios.post(url, bodyFormData)
    .then(function (response) {
        callback(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const user_logout = (userinfo, callback) => {
    const url = `${authUrl}/logout`;
    var bodyFormData = new FormData();

    Object.keys(userinfo).map(value => {
        bodyFormData.set(value, userinfo[value]);
    });

    axios.post(url, bodyFormData)
    .then(function (response) {
        callback(response);
    })
    .catch(function (error) {
        callback(error);
    });
}