import useSWR, {mutate} from 'swr';
import axiosInstance from 'axiosInstance';

const fetcher = (url) => axiosInstance.get(url).then(res => res.data?.data);

export function useOffers() {

    const { data, mutate, error } = useSWR('website/offer', fetcher, { revalidateOnFocus: false });

    const loading = !data && !error;

    return {
        loading,
        error,
        data: data || [],
        mutate,
    };

}

export function useSlides() {

    const { data, mutate, error } = useSWR('website/slide', fetcher, { revalidateOnFocus: false });

    const loading = !data && !error;

    return {
        loading,
        error,
        data: data || [],
        mutate,
    };

}
export function useSocial() {

    const { data, mutate, error } = useSWR('website/links', fetcher, { revalidateOnFocus: false });

    const loading = !data && !error;

    return {
        loading,
        error,
        data: data || [],
        mutate,
    };

}
export function useSettings() {

    const { data, mutate, error } = useSWR('website/settings', fetcher, { revalidateOnFocus: false });

    const loading = !data && !error;

    return {
        loading,
        error,
        data: data || [],
        mutate,
    };

}

export function useArticles(type) {
    const { data, mutate, error } = useSWR(`website/article?type=${type}`, fetcher, { revalidateOnFocus: false });
    const loading = !data && !error;
    return {
        loading,
        error,
        data: data || [],
        mutate,
    };
}


export function useArticle(id) {
  const shouldFetch = id != null && id !== 'undefined';
  const { data, mutate, error } = useSWR(
    shouldFetch ? `website/article/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  const loading = shouldFetch && !data && !error;
  return {
    loading,
    error,
    data: data,
    mutate,
  };
}

export async function getArticle(id) {
    const { data } = await axiosInstance.get(`website/article/${id}`);
    return data?.data;
}
