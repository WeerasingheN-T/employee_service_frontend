import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserService from '../services/UserService'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.state = {
            token: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        let user = {email: this.state.email, password: this.state.password};
        UserService.loginUser(user, "login").then((res) => {
            this.setState({message: res.data}, () =>{
                alert(res.data);
                this.props.history.push({ pathname: '/verify', state: { user: user } });
            });
        }).catch((error) =>{
            if (error.response && error.response.data) {
                alert(error.response.data); 
            } else {
                alert("An error occurred. Please try again.");
            }
        })

    }

    render() {
        return (
            <div className="container mt-5">
                <div className = "card col-md-6 offset-md-3 offset-md-3 form-element">
                <h2 className="text-center mt-4" 
                    style={{ fontFamily: "'Codystar', sans-serif",fontWeight: 'bold' }}>Sign In</h2>
                <form onSubmit={this.handleSubmit} className="mt-3">
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="text-center mt-5">
                        <button type='submit'
                           className='btn btn-primary'
                           style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid #358de4' }}>
                           <span style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>Sign In</span>
                        </button>
                    </div>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                </div>
            </div>
        );
    }
}

export default SignIn;
