import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';


class UserProfile extends Component {
        constructor(props){
            super(props)
            this.state = { username: "", usersurname: "" , age: "", userImgUrl: "", month: "", year: ""};
            }
            
        

        handleFormSubmit = event => {
            event.preventDefault();
            const name = this.state.username;
            const surname = this.state.usersurname;
            const age = this.state.age;
            const image = this.state.userImgUrl;
            const month = this.state.month;
            const year = this.state.year;
//completar!
        axios
            .post("http://localhost:4000/api/....", { name, surname, age, image, month, year })
            .then(() => {
            this.setState({ name: "", surname: "", age: "", image: "", month: "", year: "" });
            })
            .catch(error => console.log(error));
            };

        handleChange = event => {
            const { name, value } = event.target;
            this.setState({ [name]: value });
        };
    

        render() {

            return (
                <div className="UserProfile">
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Name:</label>
                        <textarea
                        name="name"
                        value={this.state.username}
                        onChange={e => this.handleChange(e)}
                        />
                        <label>Surname:</label>
                        <textarea
                        name="surname"
                        value={this.state.usersurname}
                        onChange={e => this.handleChange(e)}
                        />
                        <textarea
                        name="age"
                        value={this.state.age}
                        onChange={e => this.handleChange(e)}
                        />
                        <img
                        name="image"
                        value={this.state.userImgUrl}
                        onChange={e => this.handleChange(e)}
                        />
                        <textarea
                        name="month"
                        value={this.state.month}
                        onChange={e => this.handleChange(e)}
                        />
                        <textarea
                        name="year"
                        value={this.state.year}
                        onChange={e => this.handleChange(e)}
                        />
                        revisar financial balance y Goals accomplished
                        <textarea
                        name="Financial Balance"
                        value={this.state.year}
                        onChange={e => this.handleChange(e)}
                        />
                        <textarea
                        name="year"
                        value={this.state.year}
                        onChange={e => this.handleChange(e)}
                        /> 

                        <input type="submit" value="Submit" />
                    </form>
                </div>
        )



    }
}


export default UserProfile;
