import useSWR from 'swr';
import axiosInstance from "../axiosInstance";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data?.data);

export default function useCities() {
    const { data, mutate, error } = useSWR('city', fetcher, {
        revalidateOnFocus: false,
    });
    return {
        error,
        data: data || [],
    };
}
