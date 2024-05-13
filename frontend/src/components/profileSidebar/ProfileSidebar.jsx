import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { MdGames } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { MdEmojiEvents } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { MdKeyboardAlt } from "react-icons/md";
import { MdNewLabel } from "react-icons/md";
import './sidebar.css'; 
import logo from '../../assets/logo.png'
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import LogoutButton from '../chatSidebar/LogoutButton';
const ProfileSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const { logout } = useLogout()
  const {authUser } = useAuthContext()
  const toggleClass = () => {
    setIsActive(!isActive);
  };
  


  return (
    
<>
  
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <div className="logo items">
          <img className= " side-logo"src={logo} alt="logo " />
          <span className="mainHead para">
            <h5>Spab-Entertainment</h5>
          </span>
        </div>

            <Link to='/userDashboard'>
            <li className="items">
                <i ><MdDashboard /></i>
                <p className="para">Dashboard</p>
            </li>
            </Link>
            <Link to='/myGames'>
            <li className="items">
                <i> <MdGames /></i>
                <p className="para">My Games</p>
            </li>
            </Link>
            <Link to='/chat'>
            <li className="items ">
              <i><IoChatbubblesSharp /></i>
                <p className="para">Chat Room</p>
            </li>
            </Link>
            {authUser?.isAdmin && 
            (<Link to='/gamesRecord'>
              <li className="items">
                  <i><MdKeyboardAlt /></i>
                  <p className="para">Record Games</p>
              </li>

              </Link>)}
             
            <Link to='/leaderBoard'>
            <li className="items">
                <i><MdLeaderboard /></i>
                <p className="para">leaderBoard</p>
            </li>
            </Link>
            <Link to='/tournaments'>
            <li className="items">
                <i ><MdEmojiEvents /></i>
                <p className="para">Events</p>
            </li>
            </Link>
          {authUser.isAdmin && (
            <Link to='/createTournament'>
            <li className="items">
                <i ><MdNewLabel /></i>
                <p className="para">New tournament</p>
            </li>
            </Link>
          )}
            

        <Link to='/'>
         <li className=" items items-logout logout-btn">
            <i  onClick={logout}><LogoutButton></LogoutButton> </i>
          <p className="para">Logout</p>
        </li> 
        
        </Link>
      </div>

      

      <div className= {`toggler ${isActive ? "active" : ""}`}>
        <i  id="toggle-bars" onClick={toggleClass}><FaBars /></i>
        <i  id="toggle-cross" onClick={toggleClass}><FaXmark /></i>
      </div>
   
    
</>
    

  );
};

export default ProfileSidebar;