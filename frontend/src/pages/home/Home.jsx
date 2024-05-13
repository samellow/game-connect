import React from 'react'
import './home.css';
import { Footer,About, Header } from '../../containers';
import {  Navbar } from '../../components';

const Home = () => {
  return (
     
    <div className='app'>
    <div className='gradient__bg'>
        <Navbar />
        <Header />
    </div>
    <About />
    < Footer />
</div>
  )
}

export default Home