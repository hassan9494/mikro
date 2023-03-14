import axiosInstance from 'axiosInstance';

export async function createOrder(params) {
    const { data } = await axiosInstance.get(`order`, params);
    return data?.data;
}
