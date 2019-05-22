import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Fetch_departments from '../actions/depart-action';
import Fetch_Employees from '../actions/actions';
import ReactSearchBox from 'react-search-box';
//import Table from './Table';

import { bindActionCreators } from 'redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sal: 0,
            search: '',
            show: false,
            departName: '',
            departLocation: '',
            searchNo: 5,
            query: '',
            data: [],
            searchString: []

        }
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.seachOnChange = this.seachOnChange.bind(this);
        
        //$("#empInfo").DataTable();
    }
    seachOnChange(e) {
        this.setState({
            searchNo: e.target.value
        })
    }
    handleInputChange(e) {
        var Records = this.props.FetchEmployees.FetchEmployees;
        var searchRecords = Records.filter((item) => item.empID == (e.target.value) || item.employee.toLowerCase().includes(e.target.value.toLowerCase())
            || item.departmentName.toLowerCase().includes(e.target.value.toLowerCase()) || item.departmentLocation.toLowerCase().includes(e.target.value.toLowerCase()) || item.salary == e.target.value
            || item.hireDate == e.target.value || item.manager.toLowerCase().includes(e.target.value.toLowerCase())
        )
        return this.DisplayRows(searchRecords);
    }
    handleClose() {
        this.setState({ show: false });
    }
    onChangeDepartment(e) {
        this.setState({
            departName: e.target.value
        })
    }
    AddSalary(sal, com) {
        return sal + com;
    }
    DateTimeFormate(date) {
        var dat = new Date(date);
        if (dat.getMonth() < 10)
            return dat.getFullYear() + "-" + '0' + dat.getMonth() + "-" + dat.getDate();
        else
            return dat.getFullYear() + "-" + dat.getMonth() + "-" + dat.getDate();
    }
    handleShow() {
        this.setState({ show: true });
    }
    onChangeDepartmentLocation(e) {
        this.setState({
            departLocation: e.target.value
        })
    }
  loadDepartment() {
        return this.props.Fetchdepart.Fetchdepart.map((user, i) => {
            if (i < 1) {
                <option>Select your department</option>
            } else {
                <option key={i} value={user.departmentName}>{user.departmentName}</option>
            }
        });
    }
    DisplayRows(employees) {
        if (employees.length > 0 && this.state.search === "") {

            return employees.map((user, i) => (
                <tr id="tblEmployee" key={i}>
                    <td className="tableinfo">{user.empID}</td>
                    <td className="tableinfo">{user.employee}</td>
                    <td className="tableinfo">{user.departmentName}</td>
                    <td className="tableinfo">{user.departmentLocation}</td>
                    <td className="tableinfo">{this.DateTimeFormate(user.hireDate)}</td>
                    <td className="tableinfo">{user.manager}</td>
                    <td className="tableinfo">{this.AddSalary(user.salary, user.commission)}</td>
                    <td className="tableinfo"><button type="button" className="btn btn-link"><ion-icon name="checkmark-circle-outline"></ion-icon></button></td>
                    <td className="tableinfo"><button type="button" className="btn btn-link"><ion-icon name="close"></ion-icon></button></td>
                </tr>
            ));

        }
    }
    loadingTable() {

        if (this.props.FetchEmployees.FetchEmployees.length > 0 && this.state.search === "") {
            return <table id="empInfo" className="table table-hover tableinfo">
                <thead>
                    <tr >
                        <th className="tableinfo" scope="col">Employee ID</th>
                        <th className="tableinfo" scope="col">Employee Name</th>
                        <th className="tableinfo" scope="col">Department Name</th>
                        <th className="tableinfo" scope="col">Department Location</th>
                        <th className="tableinfo" scope="col">Hire Date</th>
                        <th className="tableinfo" scope="col">Manager</th>
                        <th className="tableinfo" scope="col">Salary</th>
                        <th className="tableinfo" scope="col"></th>
                        <th className="tableinfo" scope="col"></th>
                    </tr>
                </thead>
                <tbody id="tblBody">
                    {this.DisplayRows(this.props.FetchEmployees.FetchEmployees)}
                </tbody>
                <tfoot>
                    <tr>
                        <th className="tableinfo" scope="col">Employee ID</th>
                        <th className="tableinfo" scope="col">Employee Name</th>
                        <th className="tableinfo" scope="col">Department Name</th>
                        <th className="tableinfo" scope="col">Department Location</th>
                        <th className="tableinfo" scope="col">Hire Date</th>
                        <th className="tableinfo" scope="col">Manager</th>
                        <th className="tableinfo" scope="col">Salary</th>
                        <th className="tableinfo" scope="col"></th>
                        <th className="tableinfo" scope="col"></th>
                    </tr>
                </tfoot>
            </table>
        } else {
            return <div className="loader"></div>
        }
    }
    render() {
        this.props.Fetch_Employees();
        this.props.Fetch_departments();
        let fetdepartNames = this.props.Fetchdepart.Fetchdepart;
        let fetchItems = fetdepartNames.map((fetdepartName, i) =>
            <option key={i}>{fetdepartName.departmentName}</option>
        );
        let fetchdepartItems = fetdepartNames.map((fetdepartLocation, i) =>
            <option key={i}>{fetdepartLocation.departmentLocation}</option>
        );
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div id="searchDiv" className="col-sm-6">
                            <input type="text" id="filter" className="form-control form-control-sm" placeholder="Search for..." onChange={this.handleInputChange} />
                        </div>
                        <button type="button" className="btn btn-link" onClick={this.handleShow}><ion-icon name="add-circle"></ion-icon></button>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-2">
                            <select className="form-control form-control-sm" onChange={this.seachOnChange}>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Creating Employee</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input type="text" className="form-control form-control-sm"
                                    placeholder="Enter Employee ID" />
                                <input type="text" className="form-control form-control-sm"
                                    placeholder="Enter Employee Name" />
                                <select className="form-control form-control-sm" onChange={this.onChangeDepartment} >
                                    <option> Select Any Department</option>
                                    {fetchItems}
                                </select>
                                <select type="text" className="form-control form-control-sm" onChange={this.onChangeDepartmentLocation}>
                                    <option>Select your department Location</option>
                                    {fetchdepartItems}
                                </select>
                                <input type="date" className="form-control form-control-sm"
                                    placeholder="Enter Hire Date" />
                                <input type="text" className="form-control form-control-sm"
                                    placeholder="Enter Manager" />
                                <input type="number" className="form-control form-control-sm"
                                    placeholder="Enter Salary" />
                            </Modal.Body>
                            <Modal.Footer>
                                <button variant="secondary" onClick={this.handleClose}>
                                    Close</button>
                                <button variant="primary" onClick={this.handleClose}>
                                    Save Changes</button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    {this.loadingTable()}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        FetchEmployees: state.FetchEmployees,
        Fetchdepart: state.Fetchdepart
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        Fetch_Employees,
        Fetch_departments,
    },
    dispatch,
)
export default connect(mapStateToProps, mapDispatchToProps)(Home);  