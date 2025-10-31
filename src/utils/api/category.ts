import axiosInstance from 'axiosInstance';

export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get('category');
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const getCategoryBySlug = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`category/${slug}`);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
};