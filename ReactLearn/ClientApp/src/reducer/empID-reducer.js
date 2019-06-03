export default function getEmployeeReducers_ID(state = { getEmployee_ID: [] }, action) {
    switch (action.type) {
        case "SHOW_EMPLOYEES_ID":
            return { ...state, getEmployee_ID: action.payload };

        default:
            return state
    }
}