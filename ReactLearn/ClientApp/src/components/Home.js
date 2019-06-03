import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Fetch_departments from '../actions/depart-action';
import Fetch_Employees from '../actions/actions';
//import Table from './Table';
//import Fetch_Employees_ID from '../actions/empID-action';

import { bindActionCreators } from 'redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sal: 0,
            search: '',
            show: false,
            searchNo: 5,
            query: '',
            data: [],
            searchString: [],
            
            displayEdit:false

        }
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.seachOnChange = this.seachOnChange.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        //this.PolpulateModel = this.PolpulateModel.bind(this);
        //$("#empInfo").DataTable();
        this.props.Fetch_Employees();
        this.props.Fetch_departments();
    }
    

    seachOnChange(e) {
        this.setState({
            searchNo: e.target.value
        })

    }
    onChangeempID(e) {
        this.setState({
            empID: e.target.value
        });
    }
    onChangeName(e) {
        this.setState({
            empName: e.target.value
        });
    }
    onChangeDepartment(e) {
        this.setState({
            DepName: e.target.value
        });
    }
    onChangeDepartmentLocation(e) {
        this.setState({
            departmentLocation: e.target.value
        });
    }
    onChangeHireDate(e) {
        this.setState({
            HireDate: e.target.value
        });
    }
    onChangeManager(e) {
        this.setState({
            Manager: e.target.value
        });
    }
    handleDownload(e) {
        var downloadLink;
        var filename = "tableData";
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById("empInfo");
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        // Specify file name
        filename = filename ? filename + '.xlsx' : 'excel_data.xlsx';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }
    }
    onChangeSalary(e) {
        this.setState({
            Salary: e.target.value
        });
    }
    PolpulateModel(data) {

         this.DisplayRowsEmpID(data);

    }
    
    handleInputChange(e) {
        var Records = this.props.FetchEmployees.FetchEmployees;
        var searchRecords = Records.filter((item) => item.empID === (e.target.value) || item.employee.toLowerCase().includes(e.target.value.toLowerCase())
            || item.departmentName.toLowerCase().includes(e.target.value.toLowerCase()) || item.departmentLocation.toLowerCase().includes(e.target.value.toLowerCase()) || item.salary === e.target.value
            || item.hireDate === e.target.value || item.manager.toLowerCase().includes(e.target.value.toLowerCase())
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
    onChangeDepartmentLocations(e) {
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
                    <td className="tableinfo"><button type="button" onClick={()=>this.PolpulateModel(user)} className="btn btn-link"><ion-icon name="checkmark-circle-outline"></ion-icon></button></td>
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
                        <button type="button" className="btn btn-link" onClick={this.handleDownload}><ion-icon name="save"></ion-icon></button>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-2">
                            <select className="form-control form-control-sm" onChange={this.seachOnChange}>
                                
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
                                <select className="form-control form-control-sm" onChange={this.onChangeDepartments} >
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
        Fetchdepart: state.Fetchdepart,
        //getEmployee_ID: state.getEmployee_ID
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        Fetch_Employees,
        Fetch_departments,
        //Fetch_Employees_ID
    },
    dispatch,
)
export default connect(mapStateToProps, mapDispatchToProps)(Home);  