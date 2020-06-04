import axios from 'axios';
// import router from './router';
// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.baseURL = 'http://120.26.177.203/';

// // http request 拦截器
axios.interceptors.request.use(config => {
        let token = localStorage.getItem('HEADER_TOKEN')
        if (token) { //判断token是否存在
            config.headers['HEADER-TOKEN'] = token; //将token设置成请求头
            // config.headers.X_XSRF_TOKEN = this.$cookies.get('XSRF-TOKEN'); //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// // http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         if (response.data.errno === 999) {
//             router.replace('/');
//             console.log("token过期");
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
export default axios;