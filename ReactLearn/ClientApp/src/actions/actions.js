﻿//import * as actionTypes from './Types';

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

export default function Fetch_Employees() {
    var URL = "api/Display/GetEmployeeDetails";
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        const token = localStorage.token;
        return fetch(URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    // An error will occur if the token is invalid.
                    // If this happens, you may want to remove the invalid token.
                    localStorage.removeItem("token")
                } else {
                    dispatch(fetchPostsSuccess(data))
                }
            })
    };
}
function fetchPostsSuccess(payload) {
    return {
        type: "SHOW_EMPLOYEES",
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

