import React from 'react'
import './myGames.css'
import { ProfileSidebar } from '../../components'
import useGetGamesForUser from '../../hooks/useGetGamesForUser'
import moment from 'moment/moment'
const MyGames = () => {
const{gamesFor} = useGetGamesForUser()
  return (
    <>
    {!gamesFor ? <div className='games-loading'>Loading...</div> : (
      <div className='my-games'>
  <ProfileSidebar></ProfileSidebar>
  <div className="my-games-heading">
    <h1>My Games:</h1>
 
  <div className="overflow-x-auto">
    <table className="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Player1</th>
          <th>Player2</th>
          <th>scores</th>
          <th>Winner</th>
          <th>Date Played</th>
        </tr>
      </thead>
      <tbody>
        {gamesFor.map((games,index)=> (
             <tr key={games._id}>
             <th>{index + 1}</th>
             <td>{games.player1.username}</td>
             <td>{games.player2.username}</td>
             <td>{games.score}</td>
             <td>{games.winner === null ? `draw` : games.winner.username}</td>
             <td>{moment(games.createdAt).format('DD-MM-YYYY')}</td>
           </tr>
        ))}
        
       
      </tbody>
    </table>
  </div>
  </div>
  </div>) }
    </>
  
  )
}

export default MyGames