import useSWR from 'swr';
import Fuse from 'fuse.js';
import axiosInstance from 'axiosInstance';

const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    minMatchCharLength: 2,
    keys: ['title'],
};

const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

function search(list, pattern) {
    const fuse = new Fuse(list, options);

    return fuse.search(pattern).map((current) => current.item);
}

// import productFetcher from 'utils/api/product';
const productFetcher = (url) => axiosInstance.get(url).then(res => res.data);

interface Props {
    text?: any;
    category?: any;
    offset?: number;
    limit?: number;
    old?: any;
    page?: any;
}


export default function useProducts(variables: Props) {

    const { text, category, offset = 0, limit = 40, old = [], page } = variables ?? {};

    const search = text ? `&search=${text}` : '';

    const { data, mutate, error } = useSWR(`product?category=${category || ''}&page=${page || 1}${search}`, productFetcher, {
        revalidateOnFocus: false,
    });

    const loading = !data && !error;

    let products = data?.data;

    return {
        loading,
        error,
        data: products || [],
        mutate,
        totalPages: data?.meta?.last_page,
        currentPage: data?.meta?.current_page
    };
}


export function useProduct(slug) {

    const { data, error } = useSWR(`product/${slug}`, productFetcher);

    const loading = !data && !error;

    return {
        loading,
        error,
        data: data?.data,
    };
}

export const autocomplete = ({ text, category = '' }) => {
    return axiosInstance.get(`product?search=${text || ''}&category=${category || ''}&page=${1}`).then(res => res.data);
}
