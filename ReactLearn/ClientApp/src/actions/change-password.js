import { userConstants } from '../_constants';

function loginFailed(message) {
    return message
}

export default function ForgetUser(username) {
    return async dispatch => {

        var data = dispatch(ForgetRequest(username));
        try {
            await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
            dispatch(loginSuccess(data));
            return Promise.resolve(true);
        }
        catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
            return Promise.reject()
        }
    }
}
    function loginSuccess(response) {
        return { type: userConstants.PASSWORD_CHANGE, response }
    }
function ForgetRequest(username){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    };

    return fetch(`api/Forget`, requestOptions)
        .then((res) => res.json())
        .then(data => {
            return data;
        });
}