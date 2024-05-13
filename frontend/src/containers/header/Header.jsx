import React from 'react';
import ps5 from '../../assets/ps5.jpg';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Press Play,Enter Joy  <br /> SPAB-Entertainment, Your Happy Place!
       </h1>
      <p>Level up your play, redefine your gaming experience, and let the excitement begin at SPAB-Entertainment</p>
    </div>

    <div className="gpt3__header-image">
      <img src={ps5} alt='ps5' />
    </div>
  </div>
);

export default Header;