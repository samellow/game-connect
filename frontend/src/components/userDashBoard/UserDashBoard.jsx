import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import gamer from '../../assets/ps 5 gamer.jpg'
import './userDashboard.css'
import useGetData from '../../hooks/useGetData'

const UserDashBoard = () => {
  const { authUser } = useContext(AuthContext)
  const {topPlayer, loading}= useGetData()

  const progress = authUser.avgPoints/3 * 100;


  return (
    <>
  {!topPlayer ? (<div> loading...</div>): (<div className='container-user'>
      <div className='user'>
        <p>Welcome <span className='user-auth'>{authUser.username}</span></p>
      </div>
    <div className="stats-section">

      <div className='top-gamer'>
        <div className="top-gamer-info">
          <div className="top-gamer-header">
            <p>Top gamer</p>
          </div>
          <div className="top-gamer-user-games">
           <p className='username'>{topPlayer.username}</p> 
           <p className='games'>played {topPlayer.gamesPlayed} games</p>
          </div>
        </div>
        <div className="top-gamer-stats">
            <p>Average points:  <span className='top-player-points'>{topPlayer.avgPoints}</span></p>
        </div>
        <div className='top-gamer-controller'>
          <img src={gamer} alt="" />
        </div>
      </div>
    
      <div className="competitive-overview">
        <div className="overview-header">
          <p>Competitive-overview</p>
        </div>
        <div className="gamer-stats">
          <div className="win-rate">
            <div className="radial-progress" style={{"--value":progress}} role="progressbar"><span className='progress-radial'>{authUser.avgPoints}</span></div>
          </div>
          <div className="wins">
            <p>{authUser.wins} {authUser.wins <= 1 ? 'win' : 'wins'}</p>
          </div>
          <div className="losses">
            <p>{authUser.losses} {authUser.losses <= 1? 'loss': 'losses'}</p>
          </div>
        </div>
        
      </div>
      </div>
    </div>)}
    
</>

  )
}

export default UserDashBoard