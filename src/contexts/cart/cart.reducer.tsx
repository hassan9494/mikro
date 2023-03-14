// export const cartItemsTotalPrice = (items, { discountInPercent = 0 } = {}) => {
export const cartItemsTotalPrice = (items, coupon = null) => {
    if (items === null || items.length === 0) return 0;
    const itemCost = items.reduce((total, item) => {
        if (item.sale_price) {
            return total + item.sale_price * item.quantity;
        }
        return total + item.price * item.quantity;
    }, 0);
    // const discountRate = 1 - discountInPercent;
    let discount = 0;

    if (coupon) {
        discount = coupon.is_percentage ? itemCost * Number(coupon.amount) / 100 : itemCost - coupon.amount;
    }
    // itemCost * discountRate * TAX_RATE + shipping;
    // return itemCost * discountRate;
    return itemCost - discount;
};
// cartItems, cartItemToAdd
const addItemToCart = (state, action) => {

    if (action.payload.availableQty == 0) {
        return [...state.items];
    }

    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
    );

    if (existingCartItemIndex > -1) {
        const newState = [...state.items];
        newState[existingCartItemIndex].quantity += action.payload.quantity;

        if (newState[existingCartItemIndex].quantity > action.payload.availableQty) {
            newState[existingCartItemIndex].quantity = action.payload.availableQty;
        }

        return newState;
    }
    return [...state.items, action.payload];
};

// cartItems, cartItemToRemove
const removeItemFromCart = (state, action) => {
    return state.items.reduce((acc, item) => {
        if (item.id === action.payload.id) {
            const newQuantity = item.quantity - action.payload.quantity;

            return newQuantity > 0
                ? [...acc, { ...item, quantity: newQuantity }]
                : [...acc];
        }
        return [...acc, item];
    }, []);
};

const clearItemFromCart = (state, action) => {
    return state.items.filter((item) => item.id !== action.payload.id);
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'REHYDRATE':
            return { ...state, ...action.payload };
        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };
        case 'ADD_ITEM':
            return { ...state, items: addItemToCart(state, action) };
        case 'REMOVE_ITEM':
            return { ...state, items: removeItemFromCart(state, action) };
        case 'CLEAR_ITEM_FROM_CART':
            return { ...state, items: clearItemFromCart(state, action) };
        case 'CLEAR_CART':
            return { ...state, items: [], coupon: null };
        case 'APPLY_COUPON':
            return { ...state, coupon: action.payload };
        case 'REMOVE_COUPON':
            return { ...state, coupon: null };
        case 'TOGGLE_RESTAURANT':
            return { ...state, isRestaurant: !state.isRestaurant };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};
