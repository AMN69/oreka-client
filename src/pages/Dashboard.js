import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';
import React, { useState } from "react";
import FormCheck from "/src/components/FormCheck";
import FormBullet from "/src/components/FormBullet";
import FormFinance from "/src/components/FormFinance";


class Dashboard extends Component {


<section>
      <div>
        <FormCheck />
      </div>
      <div>
        <FormBullet />
      </div>
      <div>
        <FormFinance />
      </div>
    </section>

}

export default Dashboard;
