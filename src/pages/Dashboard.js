import React, { Component } from "react";

import Habits from "../components/Habits";
import People from "../components/People";
//import Finance from "../components/Finance";
import Skills from "../components/Skills";
import Appointments from "../components/Appointments";
import Places from "../components/Places";
import Reward from "../components/Reward";
import Insights from "../components/Insights";
import services from "../lib/auth-service";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';
import Incomes from "../components/Incomes";
import Expenses from "../components/Expenses";


class Dashboard extends Component {

  state = { messageAboutAgenda: "",
    month: 0, 
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
    } };
  
  handleFormCreate = async (event) => {
    event.preventDefault();

    try {
      const { month, year } = this.state;
      const userId = this.props.user._id;
      const agendaCheck = await services.getagen({ year, month, userId });
      if (agendaCheck) {
        this.setState({messageAboutAgenda: "This year/month exists already, you can't create it."});
        
      } else {
        this.setState({messageAboutAgenda: "Month and year were successfully created."});
        const agenda = await services.creagen({ month, year, userId});
        console.log("Agenda id: ", agenda._id);
        this.setState({
          month: month, 
          year: year,
          agenda: {
            _id: agenda._id, 
            userId: agenda.userId,
            year: agenda.year,
            month: agenda.month,
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
            incomes: [
              {
              incomeDesc: "",
              incomeAmount: 0
              }   
            ],
            expenses: [
              {
              expenseDesc: "",
              expenseAmount: 0
              }   
            ],
            reward: "",
            insights: ""
          }
        });
      }
    } catch (error) {
        console.log("Error while creating the agenda: ", error);
        this.setState({messageAboutAgenda: "Error while creating the agenda: ," + error});
    }
    return;
  };

  handleFormUpdate = async (event) => {
    event.preventDefault();
    let {agenda} = this.state;
    let agenId = agenda._id;
    agenda.reward = "It's been updated succesfully three times.";
    const response = services.updateagen({agenId, agenda});
  };

  handleFormGet = async (event) => {
    event.preventDefault();

    try {
      const { month, year } = this.state;
      const userId = this.props.user._id;
      const agenda = await services.getagen({ year, month, userId });
      this.setState({ agenda: agenda});
      console.log("Finance agenda en Dashboard get: ", agenda);
    } catch (error) {
        console.log("Error while getting the agenda: ", error);
        this.setState({messageAboutAgenda: "Error while getting the agenda: ," + error});
        
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
      console.log("Finance agenda en Dashboard get: ", agenda);
    } catch (error) {
        console.log("Error while getting the agenda: ", error);
        this.setState({messageAboutAgenda: "Error while getting the agenda: ," + error});
        
    }
  };
        
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  render() {
    const { messageAboutAgenda, month, year, agenda } = this.state;
    if (month === 0 && year === 0) {
      this.handleFormGetCurrent()
    };
    return (
      
      
     <div className="header"> 
      <section className="header">
      
      <div className="heading">
        <h1>Dashboard</h1>
        </div>
      
      <form onSubmit={this.handleFormCreate} className="header">
        
       
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
          <input className="submit" type="submit" value="CREATE NEW" />
          <p>{messageAboutAgenda}</p>
          <button onClick={this.handleFormGet}>
            <span>GET MONTH</span>
        </button>
        </div>
        
        </form>
        
        
      </section>

      
      <section>
      
            <div>
              {agenda !== null ? <Habits {...agenda} /> : null}
            </div>
            <div>
               {agenda !== null ? <Skills {...agenda} /> : null}
            </div>
            <div>
            {agenda !== null ? <Appointments {...agenda} /> : null}
            </div>
            <div>
            {agenda !== null ? <Places {...agenda} /> : null}
            </div>
            <div>
            {agenda !== null ? <People {...agenda} /> : null}
            </div>
            <div>
            {agenda !== null ? <Incomes {...agenda} /> : null}
            </div>
            <div>
            {agenda !== null ? <Expenses {...agenda} /> : null}
            </div>
            <div>
            {agenda !== null ? <Reward {...agenda} /> : null}
            </div>
            <div>
            {agenda !== null ? <Insights {...agenda} /> : null}
            </div>
            
           
      </section>
    </div>
    );
  } 
  
};

export default withAuth(Dashboard);
