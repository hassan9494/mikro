export const cartItemsTotalPrice = (items, coupon = null) => {
    if (items === null || items.length === 0) return 0;
    const itemCost = items.reduce((total, item) => {
        if (item.sale_price) {
            return total + item.sale_price * item.quantity;
        }
        return total + item.price * item.quantity;
    }, 0);
    let discount = 0;

    if (coupon) {
        discount = coupon.is_percentage ? itemCost * Number(coupon.amount) / 100 : itemCost - coupon.amount;
    }
    return itemCost - discount;
};

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
        case 'ADD_ITEM': {
            const { payload } = action;

            // Use the same ID generation logic
            const itemId = payload.variantId
                ? `${payload.baseProductId}_${payload.variantId}`
                : payload.baseProductId.toString();

            const existingItemIndex = state.items.findIndex(
                item => item.id === itemId
            );

            if (existingItemIndex > -1) {
                const newState = [...state.items];
                newState[existingItemIndex].quantity += payload.quantity;
                return { ...state, items: newState };
            }

            return { ...state, items: [...state.items, { ...payload, id: itemId }] };
        }
        case 'REMOVE_ITEM': {
            const { payload } = action;
            const itemId = payload.variantId
                ? `${payload.baseProductId}_${payload.variantId}`
                : payload.id.toString();

            return {
                ...state,
                items: state.items.reduce((acc, item) => {
                    const currentItemId = item.variantId
                        ? `${item.baseProductId}_${item.variantId}`
                        : item.id.toString();

                    if (currentItemId === itemId) {
                        const newQuantity = item.quantity - payload.quantity;
                        return newQuantity > 0
                            ? [...acc, { ...item, quantity: newQuantity }]
                            : [...acc];
                    }
                    return [...acc, item];
                }, []),
            };
        }
        case 'CLEAR_ITEM_FROM_CART': {
            const { payload } = action;
            const itemId = payload.variantId
                ? `${payload.baseProductId}_${payload.variantId}`
                : payload.baseProductId.toString();

            return {
                ...state,
                items: state.items.filter(item => {
                    const currentItemId = item.variantId
                        ? `${item.baseProductId}_${item.variantId}`
                        : item.baseProductId.toString();
                    return currentItemId !== itemId;
                }),
            };
        }
            const isInCartHandler = (baseProductId, variantId = null) => {
                const itemId = variantId
                    ? `${baseProductId}_${variantId}`
                    : baseProductId.toString();

                return state.items?.some(item => {
                    const currentItemId = item.variantId
                        ? `${item.baseProductId}_${item.variantId}`
                        : item.baseProductId.toString();
                    return currentItemId === itemId;
                });
            };

            const getItemHandler = (baseProductId, variantId = null) => {
                const itemId = variantId
                    ? `${baseProductId}_${variantId}`
                    : baseProductId.toString();

                return state.items?.find(item => {
                    const currentItemId = item.variantId
                        ? `${item.baseProductId}_${item.variantId}`
                        : item.baseProductId.toString();
                    return currentItemId === itemId;
                });
            };
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
