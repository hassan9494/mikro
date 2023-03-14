import useSWR, {mutate} from 'swr';
import axiosInstance from 'axiosInstance';

const fetcher = (url) => axiosInstance.get(url).then(res => res.data?.data);

export default function useAddresses() {

    const { data, mutate, error } = useSWR('address', fetcher, { revalidateOnFocus: false });

    const loading = !data && !error;

    return {
        loading,
        error,
        data: data || [],
        mutate,
    };

}

export const api = {
    create: async (params) => {
        await axiosInstance.post('address', params);
        await mutate('address');
    },
    update: async (id, params) => {
        await axiosInstance.put(`address/${id}`, params);
        await mutate('address');
    },
    delete: async (id) => {
        await axiosInstance.delete(`address/${id}`);
        await mutate('address');
    },
    primary: async (id) => {
        await axiosInstance.post(`address/primary/${id}`);
        await mutate('address');
    }
}
