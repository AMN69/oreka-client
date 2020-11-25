import React, { Component } from "react";

import Habits from "../components/Habits";
import People from "../components/People";
import Finance from "../components/Finance";
import Skills from "../components/Skills";
import Appointments from "../components/Appointments";
import Places from "../components/Places";
import Reward from "../components/Reward";
import Insights from "../components/Insights";
import services from "../lib/auth-service";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';


class Dashboard extends Component {

    state = { month: 0, 
        year: 0,
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
        finance: [
            [
                  {
                  incomeDesc: "",
                  incomeAmount: 0
                  }   
            ],
            [
            {
                  expenseDesc: "",
                  expenseAmount: 0
                  }  
            ]
        ],
        reward: "",
        insights: ""
        } };


  handleFormCreate = async (event) => {
    event.preventDefault();

    try {
      const { month, year } = this.state;
      const userId = this.props.user._id;
      console.log("month:", month);
      console.log("year:", year);
      console.log("userId: ", userId);
      const agenda = await this.props.creagen({ month, year, userId });
      this.setState({
        month: "", 
        year: "",
        agenda: agenda
      });
    } catch (error) {
        console.log("Error while creating the agenda: ", error);
    }
    return;
  };

  // Idea: when we leave this page in unmount to update the agenda.
  // Question: do we have the page agenda info that is within FormCheck, FormBullet
  // FormFinance here as well or do we have to in each of those components unmount
  // update the agenda???
  
  handleFormUpdate = async (event) => {
    event.preventDefault();
    console.log("I'm in handleFormUpdate");
    let {agenda} = this.state;
    let agenId = agenda._id;
    agenda.reward = "It's been updated succesfully three times."
    console.log("agenda in handleFormUpdate before update: ", agenda);
    console.log("agenda reward: ", agenda.reward);
    const response = services.updateagen({agenId, agenda});
    console.log("after update response is: ", response);
    // services.updateagen({ agendaId: res._id, agenda: this.agenda });
  };

  // childrenUpdateParentState (agenda) {
  //   console.log("I'm back from children");
  //   let agendaCopy = [...this.state.agenda];
  //   this.setState ({agenda});
  // }

  handleFormGet = async (event) => {
    event.preventDefault();
    console.log("I'm within handleFormGet")

    try {
      const { month, year } = this.state;
      const userId = this.props.user._id;
      console.log("month:", month);
      console.log("year:", year);
      console.log("userId: ", userId);
      const agenda = await services.getagen({ year, month, userId });
      console.log("I'm back from get agenda with res: ", agenda);
      this.setState({ agenda: agenda});
    } catch (error) {
        console.log("Error while getting the agenda: ", error);
    }
  };        
        
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  render() {
    const { month, year, agenda } = this.state;
    return (
      
      <div>
      <section>
        <form onSubmit={this.handleFormCreate}>
        <div className="header1">
          <label>MONTH:</label>
          <br/>
          <input className="number" type="number" name="month" value={month} onChange={this.handleChange} />
          <br/>
        
          <label>YEAR:</label>
          <input className="number" type="number" name="year" value={year} onChange={this.handleChange} />
        </div>
        <div className="header2">
          <br/>
          <input type="submit" value="CREATE NEW MONTH"/> 
          <br/>
          <button onClick={this.handleFormGet}>
            <span>GET MONTH</span>
        </button>
        </div>
        </form>
        
        
      </section>

      
      <section>
      
            <div>
                <Habits {...agenda} />
            </div>
            <div>
                <Skills {...agenda}/>
            </div>
            <div>
                <Appointments {...agenda}/>
            </div>
            <div>
                <Places {...agenda}/>
            </div>
            <div>
                <People {...agenda}/>
            </div>
            <div>
                <Finance {...agenda}/>
            </div>
            <div>
                <Reward {...agenda}/>
            </div>
            <div>
                <Insights {...agenda}/>
            </div>
      
    
      </section>
    </div>
    );
  }
};

export default withAuth(Dashboard);
