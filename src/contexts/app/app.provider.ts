import { createContextHelpers } from '../create-context';
import { appReducer, initialState } from './app.reducer';

const [useAppStateValue, useAppDispatchValue, AppProvider] = createContextHelpers(appReducer, initialState);
export const useAppState = useAppStateValue;
export const useAppDispatch = useAppDispatchValue;
export { AppProvider };
