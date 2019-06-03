class SessionApi {
    static login(username, password) {
        debugger;
        const request = new Request(`api/Login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ username,password })
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static forgetResponse(username) {
        debugger;
        const request = new Request(`api/forgetPassword`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ username })
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default SessionApi;