import React, { Component } from "react";
import { withAuth } from '../lib/AuthProvider';

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-div">
      <div className="header"></div>
        <h1 className="h1-centered">Login</h1>

        <form onSubmit={this.handleFormSubmit}>
          <div className="login">
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange} className="submit"/>
          <br/>
          </div>
          <div className="login">
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} className="submit" />
          </div>
          <br/>
          <input type="submit" value="LOGIN" className="login" />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
