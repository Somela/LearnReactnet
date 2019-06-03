export default function (state = { login: []}, action) {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, login: action.payload };
        case "PASSWORD_CHANGE": {
            return { ...state, login: action.payload }
        }
        
    }
    return state;
}