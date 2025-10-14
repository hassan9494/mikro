import React, { useReducer, useContext, createContext } from 'react';
import { reducer, cartItemsTotalPrice } from './cart.reducer';
import { useStorage } from 'utils/use-storage';

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

    const couponHandler = (coupon) => {
        dispatch({ type: 'APPLY_COUPON', payload: coupon });
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

    const getCartItemsTotalPrice = () =>
        cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

    const getDiscount = () => {
        const total = cartItemsTotalPrice(state.items);
        let discount = 0;

        if (state.coupon) {
            discount = state.coupon.is_percentage ?
                total * Number(state.coupon.amount) / 100 :
                state.coupon.amount;
        }

        return discount.toFixed(2);
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