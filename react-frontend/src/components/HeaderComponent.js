import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{height: "70px" }}>
                        <div>
                            <a href="" className="navbar-brand">
                                <img src='/images/empLog.png' alt="Logo" style={{ height: "80px", width: "auto", display: "block", margin: "auto", padding: 0 }} />
                            </a>
                        </div>
                        <div>
                            <a href="" className="navbar-brand">
                               <h3 style={{ fontFamily: "'Monoton', cursive", fontSize: "24px" }}>Employee Logs</h3>
                            </a>
                        </div>               
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                            </ul>
                        </div>                       
                    </nav>
                </header>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);