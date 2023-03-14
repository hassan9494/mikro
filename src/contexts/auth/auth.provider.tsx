import React, { useReducer } from 'react';
import { AuthContext } from './auth.context';

const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
    isAuthenticated: isBrowser && !!localStorage.getItem('access_token'),
    currentForm: 'signIn',
};

function reducer(state: any, action: any) {

    console.log(state, 'auth');

    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state,
                currentForm: 'signIn',
            };
        case 'SIGNIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isAuthenticated: false,
            };
        case 'SIGNUP':
            return {
                ...state,
                currentForm: 'signUp',
            };
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
            };

        case 'FORGOTPASS':
            return {
                ...state,
                currentForm: 'forgotPass',
            };
        default:
            return state;
    }
}

type ss = {
    children: any;
};

export const AuthProvider: React.FunctionComponent<ss> = ({ children }) => {
    const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
