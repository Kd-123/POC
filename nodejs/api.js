const axios = require('axios');
const https = require('https');
var Config = require('./config.js');
// const { resolve } = require('path');
// const { rejects } = require('assert');
var Conf = Config();

const axiosConfig = {
    baseURL: `${Conf.apiHost}`
}

const axiosInstance = axios.create(axiosConfig);

// exports.getByCountry = async (country) => {
//     try {
//         console.log(`${Conf.apiHost}`);
//         console.log(`${Conf.apiContext}?country=${country}`);
//         return await axiosInstance({
//             url: `${Conf.apiContext}?country=${country}`
//         })

//     } catch (error) {
//         throw new Error(`${error}`);
//     }

// }

exports.getByCountry = (country) => {
    return new Promise((resolve, reject) => {
        resolve(axiosInstance({
            url: `${Conf.apiContext}?country=${country}`
        }));
    });
}