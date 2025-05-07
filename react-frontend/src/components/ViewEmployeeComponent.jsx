import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div className="container mt-4">
                <br></br>
                <div className="card col-md-8 offset-md-2 shadow p-4">
                    <h3 className="text-center mb-4"> View Employee Details</h3>
                        <div className="row mb-3">
                            <div className="col-sm-4 fw-bold"> Employee First Name: </div>
                            <div className="col-sm-8"> { this.state.employee.firstName }</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 fw-bold"> Employee Last Name: </div>
                            <div className="col-sm-8"> { this.state.employee.lastName }</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 fw-bold"> Employee Email ID: </div>
                            <div className="col-sm-8"> { this.state.employee.emailId }</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 fw-bold"> Employee Email ID: </div>
                            <div className="col-sm-8"> { this.state.employee.emailId }</div>
                        </div>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
