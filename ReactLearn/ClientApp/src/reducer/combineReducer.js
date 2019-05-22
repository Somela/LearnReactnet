import { combineReducers } from 'redux';
import getEmployeeReducers from './employeeReducer';
import getDepartReducer from './depart-reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

export default combineReducers({
    FetchEmployees: getEmployeeReducers,
    Fetchdepart: getDepartReducer,
    authentication,
    registration,
    users,
    alert
});