import React, { useEffect, useState } from 'react'
import { ProfileSidebar } from '../../components'
import './createTournament.css'
import FixtureList from './FixtureList'
import toast from 'react-hot-toast'
const CreateTournament = () => {

    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [tournamentName, setTournamentName] = useState('')
    const [isTournamentCreated, setIsTournamentCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      const storedData = localStorage.getItem('tournamentData');
      if (storedData) {
        const data = JSON.parse(storedData);
        setTournamentName(data.tournament.tournamentName);
        setParticipants(data.tournament.players);
        setIsTournamentCreated(true);
      }
    }, []);


    const handleAddParticipant = (event) => {
      event.preventDefault();
      if (newParticipant.trim()) {
        setParticipants([...participants, newParticipant]);
        setNewParticipant('');
      }
    };


    const handleCreateTournament = async (e) => {
                  e.preventDefault()
         if(!tournamentName || !participants.length) {
          return toast.error("Please fill in all fields");
         }      
         
         try {
          setIsLoading(true)
          const res = await fetch('/api/tournament', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              tournamentName,
              players: participants
            })
          })
          
          
          
          if (res.ok){
            const data = await res.json()
            localStorage.setItem('tournamentData', JSON.stringify(data));
            toast.success("Tournament Created Successfully")
            
            setIsTournamentCreated(true)
          } else{
            toast.error('error creating tournament')

          }
         
         } catch (error) {
          console.log(error.message)
          toast.error(error.message)
         } finally{
          setIsLoading(false)
         }
    }

   



  return (
<>
{!isLoading && (
  <div className='create-tournament'>
  <ProfileSidebar></ProfileSidebar>
   <div className="create-tournament-content">
    <div className="tournament-specifics">

      <p className="create-header">New Tournament</p>
      
      <form >
      <span className='subtitle-player'> Tournament Name:</span>
      <br />
      <input
        type="text"
        className = {`data-input ${isTournamentCreated ? 'tournament-created' : ''}`}
        value={tournamentName}
        onChange={isTournamentCreated ? () => {} : (e) => setTournamentName(e.target.value)}
        disabled={isTournamentCreated} 
      />
    </form>
      <h2 className='create-participants'>Participants:</h2>
      <div className="participants">

          <ul className='participants-list'>
              {participants && participants.map((participant, idx) => (
              <li className='each-participant' key={idx}>{`${idx+1}. ${participant}`}</li>
              ))}
          </ul>
      </div>
    
          <form onSubmit={handleAddParticipant}>
              {!isTournamentCreated && <span className="subtitle-player">Add Player</span> }
              <br />
              <input
                className = {`data-input ${isTournamentCreated ? 'tournament-created' : ''}`}
                type="text"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                disabled={isTournamentCreated} 
              />
             {!isTournamentCreated && <button type="submit" disabled={isTournamentCreated}>Add</button>} 
            </form>


          <button onClick={(e) =>  handleCreateTournament(e)} className='btn bg-orange-600 text-white'>Create Tournament</button>

    </div>
    <div className="fixture-list">
          <FixtureList ></FixtureList>

    </div>


   </div>
</div>
) }

</>
    
  )
}

export default CreateTournament