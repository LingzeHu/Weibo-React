import {ACCESS_TOKEN,  ACCESS_TOKEN_KEY } from "../constants";

const responseInterceptors = [
    {
        name: 'formatResponse',
        success(response) {
            if( response.status === 200)
                return response.data;
            
            return Promise.reject(response);
        },
        fail(err) {
            return Promise.reject({
                code: err.response.data.error_code,
                message: err.response.data.errror,
            });
        }
    },
];

const requestInterceptors = [
    {
        name: 'addHttpRequestHeader',
        success(config) {
            //config.headers['Authorization'] = `OAuth2 ${localStorage.getItem(ACCESS_TOKEN_KEY) }`;
            config.headers['Authorization'] = `OAuth2 ${ ACCESS_TOKEN }`; 
            return config;
        },
        fail(err) {
            console.error('request error: ', err);
            return Promise.reject(err);
        }
    }
]

const interceptors = {
    response: responseInterceptors,
    request: requestInterceptors
};

function doInstall(instance, options= { }) {
    const { type } = options;
    interceptors[type]
        .forEach((interceptor) => {
            const { success, fail } = interceptor;
            instance.interceptors[type].use(success, fail);
        })
}

export function install(instance, option = {}) {
    doInstall(instance, {
        type: 'response',
    });
    doInstall(instance, {
        type: 'request',
    });
}