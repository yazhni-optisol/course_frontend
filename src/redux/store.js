import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers/Root Reducer';

const initialState = {};
const middleware = [thunk];
const devTools =
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(...middleware)
        : composeWithDevTools(
            applyMiddleware(...middleware),
        );

const store = createStore(
    rootReducer,
    initialState,
    devTools,
    
);

export default store;
