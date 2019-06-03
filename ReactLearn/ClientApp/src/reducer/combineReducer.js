import { combineReducers } from 'redux';
import getEmployeeReducers from './employeeReducer';
import getDepartReducer from './depart-reducer';
import getEmployeeReducers_ID from './empID-reducer';
import register_Employee from './registration.reducer';

export default combineReducers({
    FetchEmployees: getEmployeeReducers,
    Fetchdepart: getDepartReducer,
    getEmployee_ID: getEmployeeReducers_ID,
    register_Employee:register_Employee,
    
});