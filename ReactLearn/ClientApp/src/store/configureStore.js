import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import combineAllReducer from '../reducer/combineReducer';


export default function configureStore(history, initialState) {

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];
        const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

     let store = createStore(
        combineAllReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    return store;

    //store.dispatch(Fetch_Employees());
}