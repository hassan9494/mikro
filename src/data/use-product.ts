import useSWR from 'swr';

const productFetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        console.error('Failed to fetch:', res.statusText);
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

interface Props {
    slug: string;
}

export default function useProduct({ slug }: Props) {
    const { data, mutate, error } = useSWR('/api/products.json', productFetcher);

    const loading = !data && !error;
    let product = data?.filter((current) => current.slug === slug);

    return {
        loading,
        error,
        data: product,
        mutate,
    };
}