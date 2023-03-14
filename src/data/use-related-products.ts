import useSWR from 'swr';
import axiosInstance from 'axiosInstance';

const productFetcher = (url) => axiosInstance.get(url).then(res => res.data);

interface Props {
    sku?: any;
}

export default function useRelatedProducts(variables: Props) {

    const { sku } = variables ?? {};

    const { data, mutate, error } = useSWR(`product/${sku}/related`, productFetcher);

    const loading = !data && !error;

    let products = data?.data;
    return {
        loading,
        error,
        data: products,
        mutate,
    };
}
