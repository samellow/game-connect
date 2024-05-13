import React, { useContext } from 'react'
import './leaderBoard.css'
import { ProfileSidebar } from '../../components'
import GamersRankingContext from '../../context/GamersRankingContext'
const LeaderBoard = () => {
    
    const { gamers, loading} = useContext(GamersRankingContext)
    const gamersPlayed = gamers.filter(gamer => gamer.hasOwnProperty('gamesPlayed')); 

  return (
    <>
    {loading ? (<div> loading ...</div>): (<div className='ranking'>
        <ProfileSidebar></ProfileSidebar>
        <div className="ranking-content">
            <div className="ranking-heading">
                <h1>Gamers Current Ranking:</h1>
            </div>
        <div className="overflow-x-auto">
        <table className="table">
            <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
                <th>Games Played</th>
                <th>Average Points</th>
            </tr>
            </thead>
            <tbody>
                {gamersPlayed.map((user, index)=> (
                     <tr key ={user._id}>
                     <th>{ index + 1}</th>
                     <td>{user.username}</td>
                     <td>{user.wins}</td>
                     <td>{user.losses}</td>
                     <td>{user.draws}</td>
                     <td>{user.gamesPlayed}</td>
                     <td>{user.avgPoints}</td>
                 </tr>
                ))}
           
            </tbody>
        </table>
</div>
        </div>
    </div>)}
    
    </>
  )
}

export default LeaderBoard