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
        <Link to={"/"} id='home-btn'>
          <h4>Home</h4>
        </Link>
        {isLoggedin ? (
          <>
            {/* <p className='navbar-user'>username:{user.username}</p>
            <button className='navbar-button' onClick={logout}>Logout</button> */}


            <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to='/dashboard'>
                  <a class="dropdown-item">Dashboard</a>
                </Link>
                <Link to='/userprofile'>
                  <a class="dropdown-item">User profile</a>
                </Link>
                <a class="dropdown-item" onClick={logout}>Logout</a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to='/login'>
                  <a class="dropdown-item">Login</a>
                </Link>
                <Link to='/signup'>
                  <a class="dropdown-item">Sign Up</a>
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
