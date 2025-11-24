import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-user-id': '00000000-0000-0000-0000-000000000000',
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // if (!isUndefined(error.response.data.issue)) {
    //   error.response.data.issue.forEach(elem => {
    //     toast.error(elem?.details?.text);
    //     if (JSON.stringify(error).includes('401')) {
    //       Router.push('/login');
    //     }
    //   });
    // } else {
    //   toast.error(error.response.data?.issue?.details?.text);
    // }
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosClient;
