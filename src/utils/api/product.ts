import axiosInstance from 'axiosInstance';

export async function getAllProducts() {
    const { data } = await axiosInstance.get(`product`);
    return data?.data;
}

export async function getProductBySlug(slug) {
    const { data } = await axiosInstance.get(`product/${slug}`);
    return data?.data;
}
