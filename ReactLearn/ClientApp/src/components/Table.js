import React from 'react';


import { bindActionCreators } from 'redux';

class Table extends React.Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        return this.props.loadRows.map((user, i) => (
           
        ));
    }
}

export default Table;