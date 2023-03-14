import axiosInstance from 'axiosInstance';

export default function useAuth() {

    const login = async (params: { email, password }) => {
        const { data } = await axiosInstance.post(`auth/login`, params);
        localStorage.setItem('access_token', data?.data?.token);
    };

    const register = async (params: { name, email, password, password_confirmation }) => {
        const { data } = await axiosInstance.post(`auth/register`, params);
        localStorage.setItem('access_token', data?.data?.token);
    };

    const logout = async () => {
        try {
            await axiosInstance.post(`auth/logout`);
        } catch (e) {
        } finally {
            localStorage.removeItem('access_token');
        }
    };

    const forgotPassword = async (params: { email }) => {
        await axiosInstance.post(`auth/forgot-password`, params);
    };


    const passwordReset = async (params: { email, password, password_confirmation, token }) => {
        await axiosInstance.post(`auth/reset-password`, params);
    };

    return {
        login,
        register,
        logout,
        forgotPassword,
        passwordReset
    };

}
