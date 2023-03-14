export const initialState = {
    searchTerm: '',
    isSticky: false,
    isSidebarSticky: true,
    isDrawerOpen: false,
    receivedOrder: null,
    isLoading: false,
};

type ActionType =
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_STICKY' }
    | { type: 'REMOVE_STICKY' }
    | { type: 'SET_SIDEBAR_STICKY' }
    | { type: 'REMOVE_SIDEBAR_STICKY' }
    | { type: 'SET_LOADING', payload: any }
    | { type: 'TOGGLE_DRAWER' }
    | { type: 'RECEIVED_ORDER'; payload: any };

type StateType = typeof initialState;

export function appReducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.payload,
            };
        case 'SET_STICKY':
            return {
                ...state,
                isSticky: true,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'REMOVE_STICKY':
            return {
                ...state,
                isSticky: false,
            };
        case 'SET_SIDEBAR_STICKY':
            return {
                ...state,
                isSidebarSticky: true,
            };
        case 'REMOVE_SIDEBAR_STICKY':
            return {
                ...state,
                isSidebarSticky: false,
            };
        case 'TOGGLE_DRAWER':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen,
            };
        case 'RECEIVED_ORDER':
            return {
                ...state,
                receivedOrder: action.payload,
            };
        default: {
            throw new Error(`Unsupported action type at App Reducer`);
        }
    }
}
