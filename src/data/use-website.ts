import useSWR from 'swr';
import axiosInstance from 'axiosInstance';

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data?.data);

const noop = () => undefined;
const noopAsync = async () => undefined;

const isBrowser = () => typeof window !== 'undefined';

type UseWebsiteResponse<T> = {
  loading: boolean;
  error: unknown;
  data: T;
  mutate: (data?: T | Promise<T> | undefined, shouldRevalidate?: boolean | undefined) => Promise<T | undefined>;
};

function ssrFallback<T>(data: T): UseWebsiteResponse<T> {
  return {
    loading: false,
    error: null,
    data,
    mutate: noopAsync as UseWebsiteResponse<T>['mutate'],
  };
}

export function useOffers() {
  const key = isBrowser() ? 'website/offer' : null;
  const { data, mutate, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  const loading = !data && !error;

  if (!isBrowser()) {
    return {
      loading: false,
      error: null,
      data: [],
      mutate: async () => undefined,
    };
  }

  return {
    loading,
    error,
    data: data || [],
    mutate,
  };
}

export function useSlides() {
  const key = isBrowser() ? 'website/slide' : null;
  const { data, mutate, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  const loading = !data && !error;

  if (!isBrowser()) {
    return {
      loading: false,
      error: null,
      data: [],
      mutate: async () => undefined,
    };
  }

  return {
    loading,
    error,
    data: data || [],
    mutate,
  };
}

export function useSocial() {
  const key = isBrowser() ? 'website/links' : null;
  const { data, mutate, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  const loading = !data && !error;

  if (!isBrowser()) {
    return {
      loading: false,
      error: null,
      data: {} as Record<string, unknown>,
      mutate: async () => undefined,
    };
  }

  return {
    loading,
    error,
    data: data || {},
    mutate,
  };
}

export function useSettings() {
  const key = isBrowser() ? 'website/settings' : null;
  const { data, mutate, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  const loading = !data && !error;

  if (!isBrowser()) {
    return {
      loading: false,
      error: null,
      data: {} as Record<string, unknown>,
      mutate: async () => undefined,
    };
  }

  return {
    loading,
    error,
    data: data || {},
    mutate,
  };
}

export function useArticles(type: string) {
  const key = isBrowser() ? `website/article?type=${type}` : null;
  const { data, mutate, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  const loading = !data && !error;

  if (!isBrowser()) {
    return {
      loading: false,
      error: null,
      data: [] as any[],
      mutate: async () => undefined,
    };
  }

  return {
    loading,
    error,
    data: data || [],
    mutate,
  };
}

export function useArticle(id: string | number | undefined) {
  const shouldFetch = id != null && id !== 'undefined';
  const key = shouldFetch ? `website/article/${id}` : null;
  const { data, mutate, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  const loading = shouldFetch && !data && !error;

  if (!isBrowser()) {
    return {
      loading: false,
      error: null,
      data: undefined,
      mutate: async () => undefined,
    };
  }

  return {
    loading,
    error,
    data,
    mutate,
  };
}

export async function getArticle(id) {
    const { data } = await axiosInstance.get(`website/article/${id}`);
    return data?.data;
}
