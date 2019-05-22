//import { SHOW_EMPLOYEES } from '../actions/Types';

export default function getDepartReducer(state = { Fetchdepart: [] }, action) {
    switch (action.type) {
        case "SHOW_DEPARTMENT_LIST":
            return { ...state, Fetchdepart: action.payload };
        default:
            return state
    }
}