import axios from './axios.service';

export const setAuthToken = (token: string) => localStorage.setItem('accessToken', token);
export const setRefreshToken = (token: string) => localStorage.setItem('refreshToken', token);

export const getAuthToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const login = (body: { email: string; password: string }) => axios.post(`/auth/login`, body);

export const getMe = () => axios.get(`/auth/me`);
