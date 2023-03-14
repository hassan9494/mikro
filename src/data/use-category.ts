import useSWR from 'swr';
import axiosInstance from 'axiosInstance';

const fetcher = (url) => axiosInstance.get(url).then(res => res.data);

export default function useCategory() {
    const { data, mutate, error } = useSWR('category', fetcher, {
        revalidateOnFocus: false,
    });
    const loading = !data && !error;
    return {
        loading,
        error,
        data: data?.data,
        mutate,
    };
}
