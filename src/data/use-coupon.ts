import useSWR from 'swr';
import axiosInstance from "../axiosInstance";
//
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useCoupon() {
    const { data, mutate, error } = useSWR('/api/coupon.json', fetcher);

    const verifyCoupon = async (coupon_code) => {
        console.log(coupon_code, 'coupon_code');
        // return await fetch('/api/coupon', {method: 'POST', body: coupon_code})
        return data.find((current) => current.code === coupon_code);
    };

    return {
        error,
        data,
        mutate,
        verifyCoupon,
    };
}

export const verifyCoupon = async (code) => {
    const { data } = await axiosInstance.post(`coupon/check`, { code });
    return data?.data;
}

