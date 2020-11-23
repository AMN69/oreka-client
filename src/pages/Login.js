import React, { Component } from "react";
import { withAuth } from '../lib/AuthProvider';

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    //console.log('Login -> form submit', { username, password });
    this.props.login({ email, password })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.props);
    const { email, password } = this.state;

    return (
      <div className="login-div">
        <h1 className="h1-centered">Login</h1>

        <form onSubmit={this.handleFormSubmit}>
          
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange}/>
          <br/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <br/>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
