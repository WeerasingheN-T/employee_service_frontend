import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserService from '../services/UserService'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empId:'',
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.state = {
            message: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        const randomEmpId = 'EMP' + Math.floor(1000 + Math.random()*9000);
        this.setState({empId: randomEmpId});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        let user = {empId: this.state.empId, email: this.state.email, password: this.state.password};
        UserService.registerUser(user).then((res) => {
            this.setState({ message: res.data},() => {
                alert(`${this.state.message}`);
                this.props.history.push("/");

            });
        }).catch((error)=>{
            if (error.response && error.response.data) {
                alert(error.response.data); // Show error message from backend
            } else {
                alert("An error occurred. Please try again.");
            }
        })
    }

    render() {
        return (
            <div className="container mt-5" style={{ marginBottom: '30px' }}>
                <div className = "card col-md-6 offset-md-3 offset-md-3 form-element">
                <h2 className="text-center mt-4"
                   style={{ fontFamily: "'Codystar', sans-serif",fontWeight: 'bold' }}>Sign Up</h2>
                <form onSubmit={this.handleSubmit} className="mt-3">
                <div className="form-row row">
                    <div className="form-group col-md-6">
                        <label htmlFor="empId">Employee ID</label>
                        <input
                            type="empId"
                            className="form-control input-element"
                            id="empId"
                            name="empId"
                            value={this.state.empId}
                            readOnly
                            placeholder="Enter employee ID"
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control input-element"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>    
                </div>
                <div className="form-row row">
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control input-element"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control input-element"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                </div> 
                   <div className="text-center mt-5">
                        <button type='submit'
                           className='btn btn-primary'
                           style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid #358de4' }}>
                           <span style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>Sign Up</span>
                        </button>
                    </div>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/">Sign In</Link>
                </p>
               </div>
            </div>
        );
    }
}

export default SignUp;
