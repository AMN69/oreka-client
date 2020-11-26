import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';
import services from "../lib/auth-service";



class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state = { 
            messageAboutUser: "",
            messageAboutAgenda: "",
            username: this.props.user.username, 
            usersurname: this.props.user.usersurname, 
            age: this.props.user.age, 
            userImgUrl: this.props.user.userImgUrl, 
            month: 0, 
            year: 0,
            monthlyBalance: 0,
            monthlyAccomplishments: 0,
            agenda: {
                userId:{},
                year: 0,
                month: 0,
                habits: [{
                    habitToDoDesc: "",
                    habitDoneTick: false
                }],
                skills: [{
                    skillToDoDesc: "",
                    skillDoneTick: false
                }],
                appointments: [{
                    appointmentDesc: "",
                    appointmentTick: false
                }],
                peopleToMeet: [{
                    personToMeetDesc: "",
                    personToMeetTick: false
                }],
                placesToVisit: [{
                    placeToVisitDesc: "",
                    placeToVisitTick: false
                }],
                incomes: [{
                    incomeDesc: "",
                    incomeAmount: 0
                }],
                expenses: [{
                    expenseDesc: "",
                    expenseAmount: 0
                }],
                reward: "",
                insights: ""
            }
        }
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { username, usersurname, age, userImgUrl } = this.state;
        const userId = this.props.user._id;
        const userModified = services.userprofile({ userId, username, usersurname, age, userImgUrl});
        this.setState({messageAboutUser: "User updated."}); 
        this.props.user.username = username;
        this.props.user.usersurname = usersurname;
        this.props.user.age = age;
        this.props.user.userImgUrl = userImgUrl;
        };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormGet = async (event) => {
        event.preventDefault();
    
        try {
          const { month, year } = this.state;
          const userId = this.props.user._id;
          const agenda = await services.getagen({ year, month, userId });
          this.setState({ agenda: agenda});
          this.setState({ monthlyBalance: this.calculateMonthlyBalance(agenda)});
          this.setState({ monthlyAccomplishments: this.calculateMonthlyAccomplishments(agenda)})
        } catch (error) {
            console.log("Error while getting the agenda: ", error);
            this.setState({messageAboutAgenda: "Error while getting the agenda."});
            
        }
      };
    
    handleFormGetCurrent = async () => {
    
        try {
          // const { month, year } = this.state;
          const userId = this.props.user._id;
          const year = new Date().getFullYear();
          const month = new Date().getMonth()+1;
          this.setState({month: month})
          this.setState({year: year})
          const agenda = await services.getagen({ year, month, userId });
          this.setState({ agenda: agenda});
          this.setState({ monthlyBalance: this.calculateMonthlyBalance(agenda)});
          this.setState({ monthlyAccomplishments: this.calculateMonthlyAccomplishments(agenda)})
        } catch (error) {
            console.log("Error while getting the agenda: ", error);
            this.setState({messageAboutAgenda: "Error while getting the agenda."});
            
        }
    };

    calculateMonthlyBalance (agenda) {
        let monthlyIncomes = 0;
        if (agenda.incomes != undefined) {
            for (let i = 0; i < agenda.incomes.length; i++) {
                monthlyIncomes = monthlyIncomes + agenda.incomes[i].incomeAmount;
            };
        };
        let monthlyExpenses = 0;
        if (agenda.expenses != undefined) {
            for (let i = 0; i < agenda.expenses.length; i++) {
                monthlyExpenses = monthlyExpenses + agenda.expenses[i].expenseAmount;
            };
        };
        return Math.round((monthlyIncomes - monthlyExpenses) * 100) / 100;
    }

    calculateMonthlyAccomplishments (agenda) {
        let totalHabitsAccomplished = 0;
        let totalHabits = 0;
        if (agenda.habits[0] != undefined) {
            for (let i = 0; i < agenda.habits.length; i++) {
                if (agenda.habits[i].habitDoneTick) {
                    totalHabitsAccomplished++;
                }
                totalHabits++;
            }
        }
        if (agenda.skills[0] != undefined) {
            for (let i = 0; i < agenda.skills.length; i++) {
                if (agenda.skills[i].skillDoneTick) {
                    totalHabitsAccomplished++;
                }
                totalHabits++;
            }
        }
        let toRoundTotalGoalsAccomplished = (totalHabitsAccomplished * 100) / totalHabits;
        let roundedTotalGoalsAccomplished = Math.round(toRoundTotalGoalsAccomplished * 100)/ 100;
        return roundedTotalGoalsAccomplished; 
    }

    render() {
        const { messageAboutUser, messageAboutAgenda, username, usersurname, age, userImgUrl, month, year, monthlyBalance, monthlyAccomplishments } = this.state;
        if (month === 0 && year === 0) {
            this.handleFormGetCurrent()
        };

        return (
           <section>
            <div className="UserProfile">
               
                <form onSubmit={this.handleFormSubmit}>
                <div className="usergen">
                    <div className="user1">
                        <br/>
                        <label>Name:</label>
                        <input type="text" name="username" value={username} onChange={e => this.handleChange(e)} />
                        <br/>
                        <label>Surname:</label>
                        <input type="text" name="usersurname" value={usersurname} onChange={e => this.handleChange(e)} />
                        <br/>
                        <label>Age:</label>
                        <input type="number" name="age" value={age} onChange={e => this.handleChange(e)} />
                        <br/>
                        <br/>
                    </div>
                    <div className="imagen">
                        <img src={userImgUrl} alt="user photo" width="125" height="150"/ >
                        <br/>
                        <br/>
                        <input type="submit" value="UPDATE INFO" />
                        <p>{messageAboutUser}</p>
                        
                    </div>
                </div>
                        
                   
                <div className="financial1">
                    <label>MONTH:</label>
                    <input type="number" name="month" value={month} onChange={this.handleChange} className="number" />
                    <br/>
                    <label>YEAR:</label>
                    <input type="number" name="year" value={year} onChange={this.handleChange} className="number" />
                    <br/>
                    <br/>
                    <button onClick={this.handleFormGet}>
                    <span>GET MONTH</span>
                
                    </button>
                </div>
               
                </form>
                <br/>
                <div className="financial">

                
                    <h5>Score</h5>
                    <br/>
                    <p>Financial balance: {monthlyBalance}</p>
                    <p>Goals accomplished: {monthlyAccomplishments}%</p>
                    <br/>
                    
                    <p>{messageAboutAgenda}</p>
                </div>
            </div>
        </section> 
            
            
        )
    }
}

export default withAuth(UserProfile);