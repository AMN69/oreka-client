import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';

class Signup extends Component {
  state = { email: "", password: "", username: "", usersurname: "", age: 0, userImgUrl: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password, username, usersurname, age, userImgUrl } = this.state;
    //console.log('Signup -> form submit', { username, password });
    this.props.signup({ email, password, username, usersurname, age, userImgUrl });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, username, usersurname, age, userImgUrl } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>

          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />

          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <label>Name:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />

          <label>Surname:</label>
          <input type="text" name="usersurname" value={usersurname} onChange={this.handleChange} />

          <label>Age:</label>
          <input type="text" name="age" value={age} onChange={this.handleChange} />

          {/* It lacks to upload photo, upload to Cloudinary and keep the url */}

          <input type="submit" value="Signup" />
        </form>

        {/* <div>
          <img photo></img>
        </div> */}
        
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
