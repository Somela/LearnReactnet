//import { SHOW_EMPLOYEES } from '../actions/Types';

export default function getEmployeeReducers (state = { FetchEmployees: [] }, action) {
    switch (action.type) {
        case "SHOW_EMPLOYEES":
            return { ...state, FetchEmployees: action.payload };
       
        default:
            return state
    }
}