import React from 'react';
import logo from '../../assets/logo.png';
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Do you want to experience gaming like never before</h1>
    </div>

    

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={logo} alt="spab-logo" />
        <p>Mwihoko, Ruiru, <br /> All Rights Reserved</p>
      </div>
     
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>Mwihoko, Ruiru</p>
        <p>0707488792</p>
        <p>spab-Entertainment</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 Spab. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;