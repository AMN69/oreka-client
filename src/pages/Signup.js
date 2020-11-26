import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';
import auth from "../lib/auth-service"; // importamos funciones para la llamada axios a la API de Cloudinary

let userImgUrl;

class Signup extends Component {
  state = { email: "", 
            password: "", 
            username: "", 
            usersurname: "", 
            age: 0};

  handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { email, password, username, usersurname, age } = this.state;
      await this.props.signup({ email, password, username, usersurname, age, userImgUrl });
      this.setState({
        email: "", 
        password: "", 
        username: "", 
        usersurname: "", 
        age: 0
      });
      userImgUrl = "";
    } catch (error) {
        console.log("Error while creating the user: ", error);
    }
    return;
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = async (e) => {

    // We create a new FormData. This is a javascript object that allow us to create a form object. 
    const uploadData = new FormData();

    // using append method we attach the file to the FormData object just created.
    // imageUrl (este nombre tiene que ser igual que en el modelo, ya que usaremos req.body como argumento del método .create() cuando creemos una nueva movie en la ruta POST '/api/movies/create')
    uploadData.append("userImgUrl", e.target.files[0]);

    try {
      const res = await auth.handleUpload(uploadData);

      // this.setState({ userImgUrl: res.secure_url });
      userImgUrl = res.secure_url;
      // console.log("in state url: ", this.state.userImgUrl);
    } catch (error) {
    }
  };

 render() {
  const { email, password, username, usersurname, age } = this.state;
    return (
      <div>
        <h1 className="h1-centered">Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>
      
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />
          <br/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <br/>
          <label>Name:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <br/>
          <label>Surname:</label>
          <input type="text" name="usersurname" value={usersurname} onChange={this.handleChange} />
          <br/>
          <label>Age:</label>
          <input type="text" name="age" value={age} onChange={this.handleChange} />
          <br/>
          <label>Add your photo:</label>
          <input type="file" onChange={(e) => this.handleFileUpload(e)} />
          <br/>
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
