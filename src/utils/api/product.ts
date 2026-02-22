import axiosInstance from 'axiosInstance';

export async function getAllProducts() {
    const { data } = await axiosInstance.get(`product`);
    return data?.data;
}

export async function getProductBySlug(slug) {
    console.log(slug)
    const { data } = await axiosInstance.get(`product/${slug}`);
    console.log(data)
    return data?.data;
}

export async function getProductBySku(sku) {
    console.log(sku)
    const { data } = await axiosInstance.get(`product/${sku}`);
    console.log(data)
    return data?.data;
}
