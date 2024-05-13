import React from 'react';
import Feature from '../../components/feature/Feature';
import './about.css';

const About = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="About-us" text="At SPAB-Entertainment, we are more than just a gaming shop; we are a thriving community dedicated to fueling the passion for gaming.We celebrate the love for gaming, foster camaraderie, and strive to be the ultimate destination where every gamer feels at home. " />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">Press Start to a World of Thrills and Excitement</h1>
      <p>Explore the Library</p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Excellence" text="From top-tier gaming equipment to a meticulously crafted gaming environment, we take pride in offering nothing but the best." />
      <Feature title="Community" text="Whether you're a casual player or a competitive enthusiast, our community fosters a welcoming atmosphere where friendships are forged, victories are celebrated, and every gaming moment becomes a shared experience." />
      <Feature title="Inclusivity" text=" We welcome gamers of all levels, backgrounds, and interests to be part of our gaming family." />
    </div>
  </div>
);

export default About;