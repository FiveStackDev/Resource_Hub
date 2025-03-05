import { Link } from "react-router-dom"
import logo from '/Resource Hub Logo.png'
import Button from '@mui/material/Button';
import { MdOutlineMenuOpen } from "react-icons/md";
import Search from './Search.jsx'
import clientlogo from '/WSO2 logo.png'
import NotificationBtn from './NotificationBtn.jsx'
import SwitchBtn from "./SwitchBtn.jsx";
import "./css/Header.css";
import Profile from "./Profile.jsx";


function Header() {
    return (
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100">

            <div className="col-sm-1  d-flex part1">
              <Link to="/" className="d-flex align-items-center logo">
                <img src={logo} className="logo" alt="Resource Hub Logo" />
              </Link>
            </div>
            <div className="col-sm-1  d-flex part1">
            <img className="clientlogo" src={clientlogo} alt="clientlogo" />
            </div>
            <div className="col-sm-2 d-flex align-items-center part2 p1-4" > 
              <Button className="menu"><MdOutlineMenuOpen /></Button> 
            </div>

            <div className="col-sm-4 d-flex align-items-center part3 p1-4" > 
              <Search></Search>
            </div>

            <div className="col-sm-1" > 
              <SwitchBtn/>
            </div>

            <div className="col-sm-1" > 
              <NotificationBtn/>
            </div>

            <div className="col-sm-1" > 
              <Profile/>
            </div>

          </div>
        </div>
      </header>
    );
  }
  
  export default Header;