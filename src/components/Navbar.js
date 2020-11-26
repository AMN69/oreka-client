import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';

// class Navbar extends Component {
//   render() {
//     const { user, logout, isLoggedin } = this.props;
//     return (
//       <nav className='navbar'>
//         <Link to={"/"} id='home-btn'>
//           <h4>Home</h4>
//         </Link>
//         {isLoggedin ? (
//           <>
//             <p className='navbar-user'>username:{user.username}</p>
//             <button className='navbar-button' onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to='/login'>
//               <button className='navbar-button'>Login</button>
//             </Link>
//             <br />
//             <Link to='/signup'>
//               <button className='navbar-button'>Sign Up</button>
//             </Link>
//           </>
//         )}
//       </nav>
//     );
//   }
// }

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar'>
        <img className='logo' src="../images/logo3.png" alt="logo"/>
        <Link to={"/"} id='home-btn'>
        
          <h5></h5>
        </Link>
        {isLoggedin ? (
          <>
            {/* <p className='navbar-user'>username:{user.username}</p>
            <button className='navbar-button' onClick={logout}>Logout</button> */}


            <div className="dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to='/dashboard'>
                  <a className="dropdown-item">Dashboard</a>
                </Link>
                <Link to='/userprofile'>
                  <a className="dropdown-item">User profile</a>
                </Link>
                <a className="dropdown-item" onClick={logout}>Logout</a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown">
              <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to='/login'>
                  <a className="dropdown-item">Login</a>
                </Link>
                <Link to='/signup'>
                  <a className="dropdown-item">Sign Up</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
