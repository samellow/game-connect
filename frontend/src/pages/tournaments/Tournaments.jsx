import React, { useEffect, useState } from 'react'
import './tournaments.css'
import ProfileSideBar from '../../components/profileSidebar/ProfileSidebar'
import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
const Tournaments = () => {
const [tournamentId, setTournamentId] = useState(null)
const [loading, setLoading] = useState(false);
const [data, setData] = useState([])
const { authUser } = useAuthContext()

useEffect(() => {
  const storedData = localStorage.getItem('tournamentData');
  if (storedData) {
    const data = JSON.parse(storedData);
    setTournamentId(data.tournament._id);
  }
}, []);


const getTournamentResults = async (e) => {
 e.preventDefault()

try {
  setLoading(true)

  const res = await fetch(`/api/tournamentRanking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tournamentId,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    setData(data)
  }
} catch (error) {
  toast.error('Error getting results ')
  console.log(error.message)
} finally{
  setLoading(false)
}
} 

const newTournament = () => {
    localStorage.removeItem('tournamentData');
  
}


  return (
    <div className='tournaments'>
        <ProfileSideBar></ProfileSideBar>

        <div className="tournament-content">
          <div className="tournament-about">Note: Tournaments are held Weekly</div>
          <div className="tournament-filter">Tournament results</div>
          <input type="submit" value = {"Get results"} className='btn bg-orange-600 text-white' onClick={getTournamentResults} /> 

          <div className="tournament-table">
          <div className="overflow-x-auto">
                  <table className="table">
                    
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Games Played </th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>Goals Scored</th>
                        <th>Goals Conceded</th>
                        <th>Goal difference</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map ((player, index)=> (
                        <tr key ={player.name}>
                        <th>{ index + 1}</th>
                        <td>{player.name}</td>
                        <td>{player.gamesPlayed}</td>
                        <td>{player.wins}</td>
                        <td>{player.draws}</td>
                        <td>{player.losses}</td>
                        <td>{player.goalsScored }</td>
                        <td>{player.goalsConceded}</td>
                        <td>{player.goalsScored - player.goalsConceded }</td>
                        <td>{player.points}</td>
                        </tr>
                      ))}
                     
                    
                    </tbody>
                  </table>
              {authUser.isAdmin && 
              <Link to='/createTournament'>
              <input type="submit" value = {"Create New Tournament"} className='btn bg-orange-600 text-white' onClick={newTournament} /> 
              </Link>
}

              </div>
          </div>
        </div>
    </div>
  )
}

export default Tournaments