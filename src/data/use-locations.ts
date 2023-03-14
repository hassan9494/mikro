import useSWR from 'swr';
import axiosInstance from "../axiosInstance";

const fetcher = (url) => axiosInstance.get(url)
    .then((res) => res.data);

export default function useLocations() {
    const { data, mutate, error } = useSWR('shipping-location', fetcher);
    return {
        error,
        data: data?.data || [],
        mutate,
    };
}
