import React, { Component } from "react";

import Habits from "../components/Habits";
import People from "../components/People";
import Finance from "../components/Finance";
import Skills from "../components/Skills";
import Appointments from "../components/Appointments";
import Places from "../components/Places";
import Reward from "../components/Reward";
import Insights from "../components/Insights";


class Dashboard extends Component {

    return () {


        <section>
            <div>
                <Habits />
            </div>
            <div>
                <Skills />
            </div>
            <div>
                <Appointments />
            </div>
            <div>
                <Places />
            </div>
            <div>
                <People />
            </div>
            <div>
                <Finance />
            </div>
            <div>
                <Reward />
            </div>
            <div>
                <Insights />
            </div>

        </section>
    }
}

export default Dashboard;
