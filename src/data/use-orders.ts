import useSWR from 'swr';
import axiosInstance from "../axiosInstance";

const fetcher = (url) => axiosInstance.get(url).then(res => res.data);

interface CategoryProps {
}

export function useOrders() {

    const { data, mutate, error } = useSWR('order', fetcher);

    return {
        // loading,
        error,
        data: data?.data || [],
        // user: data,
        mutate,
    };
}

export const order = {
    create: async (params, isUser = false) => {
        const url = isUser ? `order/user` : `order/guest`;
        const { data } = await axiosInstance.post(url, params);
        return data?.data;
    },
    coupon: async (code, total) => {
        const { data } = await axiosInstance.post(`order/user`, { code, total });
        return data?.data;
    }
}
