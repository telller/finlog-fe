import axios from 'axios';
import {
  clearTokens,
  getAuthToken,
  getRefreshToken,
  setAuthToken,
  setRefreshToken,
} from '@src/services';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = getAuthToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const issues = error?.response?.data?.issue;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
        );

        const { accessToken, refreshToken: newRefreshToken } = data.data;
        if (!accessToken || !newRefreshToken) throw new Error('No access token');
        setAuthToken(accessToken);
        setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.replace('/login');
        return Promise.reject(refreshError);
      }
    }

    if (Array.isArray(issues)) {
      issues.forEach((elem) => {
        console.log(elem?.details?.text);
        // toast.error(elem?.details?.text);
      });
    } else if (issues?.details?.text) {
      // toast.error(issues.details.text);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
