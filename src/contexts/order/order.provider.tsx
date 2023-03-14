import React, { useReducer } from 'react';
import { OrderContext } from './order.context';

type Action =
    | { type: 'SET_RECEIVED_ORDER'; payload: any };

function reducer(state: any, action: Action): any {
    switch (action.type) {
        case 'SET_RECEIVED_ORDER':
            return { ...state, received: action.payload };
        default:
            return state;
    }
}

type OrderProviderProps = {
    initData: any;
    children : any
};

export const OrderProvider: React.FunctionComponent<OrderProviderProps> = ({
   children,
   initData,
}) => {
    const [state, dispatch] = useReducer(reducer, { ...initData });
    // console.log(state, 'Order provider state');

    return (
        <OrderContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
};
