import useSWR from 'swr';
import axiosInstance from 'axiosInstance';
import {useEffect} from "react";
import {useAppDispatch} from "../contexts/app/app.provider";

const fetcher = (url) => axiosInstance.get(url)
            .then((res) => res.data);
// const end_point_url = '/'


export default function useUser() {

    const { data: user, mutate, error } = useSWR('user/me', fetcher, {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    });

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: !user && !error})
    }, [user, error])

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
        console.log(address)
        if (address.id) {
            return await axiosInstance.put(`address/${address.id}`, address);
        } else {
            return await axiosInstance.post('address', address);
        }
    };

    const setPrimaryAddress = async (id) => {
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

    const deleteAddress = async (id) => {
        return await axiosInstance.delete(`address/${id}`);
    };

    const deletePaymentCard = async (cardId) => {
        console.log(cardId, 'cardId');
        // return await fetch(end_point_url,{method: 'POST', body: cardId });
    };

    return {
        // loggedOut,
        user,
        mutate,
        error,
        loading: !user && !error,
        addOrUpdateContactNumber,
        addOrUpdateAddress,
        setPrimaryAddress,
        addOrUpdatePaymentCard,
        deleteContactNumber,
        deleteAddress,
        deletePaymentCard,
        updateProfile,
        changePassword,
    };

}
