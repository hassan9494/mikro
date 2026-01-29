import useSWR from 'swr';
import axiosInstance from 'axiosInstance';
import { useEffect } from "react";
import { useAppDispatch } from "../contexts/app/app.provider";

const fetcher = (url) => axiosInstance.get(url)
    .then((res) => res.data);

export default function useUser() {
    const { data: user, mutate, error } = useSWR('user/me', fetcher, {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    });

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: !user && !error })
    }, [user, error])

    // Helper function to check if user has only "user" role or no roles
    const hasOnlyUserRole = () => {
        if (!user || !user.roles) return true; // No roles = treat as regular user
        
        const roleNames = user.roles.map(role => role.name || role);
        
        // If user has no roles or only the 'user' role, treat as regular user
        if (roleNames.length === 0 || (roleNames.length === 1 && roleNames.includes('user'))) {
            return true;
        }
        
        // If user has 'user' role plus other roles, treat as employee
        if (roleNames.includes('user') && roleNames.length > 1) {
            return false;
        }
        
        // If user has any other roles without 'user', treat as employee
        return false;
    };

    // Helper function to check if user is an employee
    const isEmployee = () => {
        if (!user || !user.roles) return false; // No roles = not employee
        
        const roleNames = user.roles.map(role => role.name || role);
        
        // User is an employee if they have any roles AND (they have multiple roles or roles other than 'user')
        if (roleNames.length === 0) return false; // No roles = not employee
        if (roleNames.length === 1 && roleNames.includes('user')) return false; // Only 'user' role = not employee
        return true; // Has multiple roles or roles other than 'user' = employee
    };

    const updateProfile = async (params) => {
        return await axiosInstance.post(`user/profile`, params);
    };

    const changePassword = async (password, new_password) => {
        return await axiosInstance.post(`user/password`, {
            password,
            new_password
        });
    };
        const addOrUpdateContactNumber = async (contact) => {
        console.log(contact, 'contact');
        // return await fetch(end_point_url,{method: 'POST', body: contact });
    };


    const addOrUpdateAddress = async (address) => {
        // Only allow address saving if user has only "user" role or no roles
        if (!hasOnlyUserRole()) {
            throw new Error('Employees cannot save addresses. Please use guest checkout.');
        }
        
        if (address.id) {
            return await axiosInstance.put(`address/${address.id}`, address);
        } else {
            return await axiosInstance.post('address', address);
        }
    };

    const setPrimaryAddress = async (id) => {
        // Only allow if user has only "user" role or no roles
        if (!hasOnlyUserRole()) {
            throw new Error('Employees cannot manage addresses.');
        }
        
        return await axiosInstance.post(`address/${id}/primary`);
    };
     const addOrUpdatePaymentCard = async (payment_card) => {
        console.log(payment_card, 'payment_card');
        // return await fetch(end_point_url,{method: 'POST', body: payment_card });
    };

    const deleteContactNumber = async (contactId) => {
        console.log(contactId, 'contactId');
        // return await fetch(end_point_url,{method: 'POST', body: contactId });
    };


    const deletePaymentCard = async (cardId) => {
        console.log(cardId, 'cardId');
        // return await fetch(end_point_url,{method: 'POST', body: cardId });
    };


    const deleteAddress = async (id) => {
        // Only allow if user has only "user" role or no roles
        if (!hasOnlyUserRole()) {
            throw new Error('Employees cannot delete addresses.');
        }
        
        return await axiosInstance.delete(`address/${id}`);
    };

    return {
        user,
        mutate,
        error,
        loading: !user && !error,
        hasOnlyUserRole: hasOnlyUserRole(),
        isEmployee: isEmployee(),
        addOrUpdateAddress,
        setPrimaryAddress,
        addOrUpdateContactNumber,
        deleteContactNumber,
        deletePaymentCard,
        deleteAddress,
        updateProfile,
        changePassword,
    };
}