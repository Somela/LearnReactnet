import React from 'react';
import Modal from 'react-bootstrap/Modal';
class CreateModal extends React.Component {
    
    // event handling methods go here
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this);
        var stateValue = this.props.show;
        this.state = {
            show: stateValue,
        }
    }
    
    handleClose() {
        this.setState({ show: true });
    }
    
    render() {
        return (

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Creating Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control form-control-sm" placeholder="Enter Employee ID" />
                    <input type="text" className="form-control form-control-sm" placeholder="Enter Employee Name" />
                    <input type="text" className="form-control form-control-sm" placeholder="Enter Department Name" />
                    <input type="text" className="form-control form-control-sm" placeholder="Enter Department Location" />
                    <input type="text" className="form-control form-control-sm" placeholder="Enter Hire Date" />
                    <input type="text" className="form-control form-control-sm" placeholder="Enter Manager" />
                    <input type="text" className="form-control form-control-sm" placeholder="Enter Salary" />
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={this.handleClose}>
                        Close</button>
                    <button variant="primary" onClick={this.handleClose}>
                        Save Changes</button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default CreateModal;