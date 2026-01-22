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
    create: async (params, isUser = false, isEmployee = false) => {
        let url = '';
        if (isEmployee) {
            url = `order/employee`;
        } else if (isUser) {
            url = `order/user`;
        } else {
            url = `order/guest`;
        }
        
        const { data } = await axiosInstance.post(url, params);
        return data?.data;
    },
    coupon: async (code, total) => {
        const { data } = await axiosInstance.post(`order/user`, { code, total });
        return data?.data;
    }
}
