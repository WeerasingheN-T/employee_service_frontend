import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");

        if (confirmDelete) {
            EmployeeService.deleteEmployee(id).then( res => {
                this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});

        }).catch(error =>{
            console.error("Error deleting employee:",error);
        });
        }
    }
    viewEmployee(id){
        this.props.history.push(`/employee-view/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            if(Array.isArray(res.data)){
                this.setState({ employees: res.data});
            } else {
                this.setState({ employees: [] });
            } 
        })
        .catch((err)=> {
            this.setState({ employees: [] });
        });
    }

    addEmployee(){
        this.props.history.push('/employee/add');
    }

    render() {
        const { employees } = this.state;
        const safeEmployees = Array.isArray(employees) ? employees : [];

        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <i onClick={this.addEmployee} className="bi bi-person-add" 
                       style={{ color: 'blue', fontSize: '60px', cursor: 'pointer' }}></i>
                 </div>
                 <br></br>
                 <div className = "row" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    safeEmployees.length === 0? (
                                        <p>No employees found or server error.</p>
                                        ): ( safeEmployees.map(
                                        employee => ( 
                                        <tr key = {employee.id}>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-success">View </button>
                                             </td>
                                        </tr>
                                        ))
                                )}
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
