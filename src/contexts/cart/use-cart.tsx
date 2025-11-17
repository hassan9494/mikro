import React, { useReducer, useContext, createContext } from 'react';
import { reducer, cartItemsTotalPrice } from './cart.reducer';
import { useStorage } from 'utils/use-storage';
import axiosInstance from "../../axiosInstance";
import {userInfo} from "os";

const CartContext = createContext({} as any);
export const INITIAL_STATE = {
    isOpen: false,
    items: [],
    isRestaurant: false,
    coupon: null,
};

const useCartActions = (initialCart = INITIAL_STATE) => {
    const [state, dispatch] = useReducer(reducer, initialCart);

    const addItemHandler = (item, quantity = 1) => {
        // Use baseProductId from item if available, otherwise use id
        const baseId = item.baseProductId || item.id;
        const variantId = item.variantId || null;

        // Create consistent unique ID
        const itemId = variantId
            ? `${baseId}_${variantId}`
            : baseId.toString();

        const cartItem = {
            ...item,
            id: itemId,
            baseProductId: baseId,
            variantId: variantId
        };

        dispatch({ type: 'ADD_ITEM', payload: { ...cartItem, quantity } });
    };

    const removeItemHandler = (item, quantity = 1) => {
        const baseId = item.baseProductId || item.id;
        const variantId = item.variantId || null;

        // Create consistent unique ID
        const itemId = variantId
            ? `${baseId}_${variantId}`
            : baseId.toString();

        dispatch({ type: 'REMOVE_ITEM', payload: { ...item, id: itemId, quantity } });
    };

    const clearItemFromCartHandler = (item) => {
        const baseId = item.baseProductId || item.id;
        const variantId = item.variantId || null;

        // Create consistent unique ID
        const itemId = variantId
            ? `${baseId}_${variantId}`
            : baseId.toString();

        dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: { ...item, id: itemId } });
    };

    const clearCartHandler = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const toggleCartHandler = () => {
        dispatch({ type: 'TOGGLE_CART' });
    };

    // In use-cart.js - keep only the backend validation approach

    const couponHandler = async (couponCode) => {
        const token = typeof window != "undefined" ? localStorage.getItem('access_token') : '';
        try {
            let response;
            if (token){
                response = await axiosInstance.post('/coupons/validate-for-cart', {
                    coupon_code: couponCode.code || couponCode,
                    items: state.items.map(item => ({
                        id: item.baseProductId || item.id,
                        brand_id: item.brand_id,
                        price: item.price,
                        quantity: item.quantity,
                        name: item.name
                    }))
                });
            }else{
                response = await axiosInstance.post('/coupons/validate-for-cart-guest', {
                    coupon_code: couponCode.code || couponCode,
                    items: state.items.map(item => ({
                        id: item.baseProductId || item.id,
                        brand_id: item.brand_id,
                        price: item.price,
                        quantity: item.quantity,
                        name: item.name
                    }))
                });
            }


            if (response.data.valid) {
                dispatch({
                    type: 'APPLY_COUPON',
                    payload: {
                        ...response.data.coupon,
                        calculatedDiscount: response.data.discount,
                        validationData: response.data
                    }
                });
                return {
                    success: true,
                    coupon: response.data.coupon,
                    validationData: response.data
                };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error('Coupon application error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to apply coupon'
            };
        }
    };

    const removeCouponHandler = () => {
        dispatch({ type: 'REMOVE_COUPON' });
    };

    const rehydrateLocalState = (payload) => {
        dispatch({ type: 'REHYDRATE', payload });
    };

    const toggleRestaurant = () => {
        dispatch({ type: 'TOGGLE_RESTAURANT' });
    };

    const isInCartHandler = (baseProductId, variantId = null) => {
        const itemId = variantId
            ? `${baseProductId}_${variantId}`
            : baseProductId.toString();

        return state.items?.some(item => item.id === itemId);
    };

    const getItemHandler = (baseProductId, variantId = null) => {
        const itemId = variantId
            ? `${baseProductId}_${variantId}`
            : baseProductId.toString();

        return state.items?.find(item => item.id === itemId);
    };

    const getCartItemsPrice = () => cartItemsTotalPrice(state.items).toFixed(2);

    const getCartItemsTotalPrice = () => {
        const total = cartItemsTotalPrice(state.items);

        if (state.coupon && state.coupon.calculatedDiscount) {
            return (total - state.coupon.calculatedDiscount).toFixed(2);
        }

        return total.toFixed(2);
    };

    const getDiscount = () => {
        if (!state.coupon || !state.coupon.calculatedDiscount) return "0.00";
        return state.coupon.calculatedDiscount.toFixed(2);
    };

    const getItemsCount = state.items?.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return {
        state,
        getItemsCount,
        rehydrateLocalState,
        addItemHandler,
        removeItemHandler,
        clearItemFromCartHandler,
        clearCartHandler,
        isInCartHandler,
        getItemHandler,
        toggleCartHandler,
        getCartItemsTotalPrice,
        getCartItemsPrice,
        couponHandler,
        removeCouponHandler,
        getDiscount,
        toggleRestaurant,
    };
};

export const CartProvider = ({ children }) => {
    const {
        state,
        rehydrateLocalState,
        getItemsCount,
        addItemHandler,
        removeItemHandler,
        clearItemFromCartHandler,
        clearCartHandler,
        isInCartHandler,
        getItemHandler,
        toggleCartHandler,
        getCartItemsTotalPrice,
        couponHandler,
        removeCouponHandler,
        getCartItemsPrice,
        getDiscount,
        toggleRestaurant,
    } = useCartActions();
    const { rehydrated, error } = useStorage(state, rehydrateLocalState);

    return (
        <CartContext.Provider
            value={{
                isOpen: state.isOpen,
                items: state.items,
                coupon: state.coupon,
                isRestaurant: state.isRestaurant,
                cartItemsCount: state.items?.length,
                itemsCount: getItemsCount,
                addItem: addItemHandler,
                removeItem: removeItemHandler,
                removeItemFromCart: clearItemFromCartHandler,
                clearCart: clearCartHandler,
                isInCart: isInCartHandler,
                getItem: getItemHandler,
                toggleCart: toggleCartHandler,
                calculatePrice: getCartItemsTotalPrice,
                calculateSubTotalPrice: getCartItemsPrice,
                applyCoupon: couponHandler,
                removeCoupon: removeCouponHandler,
                calculateDiscount: getDiscount,
                toggleRestaurant,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);