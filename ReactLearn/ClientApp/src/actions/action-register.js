//import * as actionTypes from './Types';

export function itemsHasErrored(bool) {
    return {
        type: "ITEMS_HAS_ERRORED",
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: "ITEMS_IS_LOADING",
        isLoading: bool
    };
}

export default function register_Employee(user) {
    var URL = "api/Register";
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user })
        })
            .then((response) => {
                //if (!response.ok) {
                //    throw Error(response.statusText);
                //}

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(fetchPostsSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    }
}
function fetchPostsSuccess(payload) {
    return {
        type: "ADD_REGISTER",
        payload
    }
}
export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}

