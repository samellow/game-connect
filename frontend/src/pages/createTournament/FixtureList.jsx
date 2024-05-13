import React, { useEffect, useState } from 'react'
import './createTournament.css'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const FixtureList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [tournamentId, setTournamentId] = useState(null)
    const [fixtures, setFixtures] = useState([])
    const pageSize = 9
  
    const [fixtureScores, setFixtureScores] = useState(() => {
      const storedScores = localStorage.getItem('fixtureScores')
      try {
        return storedScores ? JSON.parse(storedScores) : {};
      } catch (error) {
        console.error('Error parsing stored scores:', error);
        return {};
      }
    });

   useEffect(()=>{
    const tournamentData = localStorage.getItem('tournamentData')

    if(tournamentData){
      const data = JSON.parse(tournamentData)
      setTournamentId(data.tournament._id)
    }
   }, []);



    useEffect(() => {
      const fetchFixtures = async () => {
        setLoading(true);
    
        try {
          const response = await fetch(`/api/tournamentFixtures`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  tournamentId,
                })
          }); 

          const data = await response.json();
          if(data.error) {
            console.log(data.error);
            toast.error(data.error)
          }
          setFixtures(data);
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      if (tournamentId) {
        fetchFixtures();
      }
    }, [tournamentId]);


    const handleScoreChange = (fixtureId, player, score) => {
      setFixtureScores({
        ...fixtureScores,
        [fixtureId]: {
          ...fixtureScores[fixtureId] || {},
          [player]: score,
        },
      });
      localStorage.setItem('fixtureScores', JSON.stringify(fixtureScores))
    };


    const handleResultSubmit = async (e, fixtureId) => {
      e.preventDefault();

      const scores = fixtureScores[fixtureId] || {};
      const player1Score = scores.player1;
      const player2Score = scores.player2;

      try {
        const res = await fetch('/api/tournamentResults', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tournamentId,
            fixtureId ,
            player1Score,
            player2Score,
          }),
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
          toast.success('Results Submitted')
        }else {
          toast.error(data.error)
        }
      } catch (error) {
        console.log(error.message)
      }finally{
        
      }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return fixtures && fixtures.slice(startIndex, endIndex);
    }

    const paginatedFixtures = getPaginatedData();

    const totalPages = fixtures && Math.ceil(fixtures.length / pageSize );
  
    
  return (

    <>
    {!loading && (<div>

{
    fixtures && ( <>
   
        <div className="fixtures-heading"> Fixtures:</div>
        <div className="overflow-x-auto">
    <table className="table">

<thead>
  <tr>
    <th></th>
    <th>Player 1</th>
    <th></th>
    <th>Player 2</th>
    <th>Player1Score</th>
    <th>player2Score</th>
  </tr>
</thead>
<tbody>
    {
       paginatedFixtures && paginatedFixtures.map((fixture, idx) => (
            <tr key={idx}>
                <td>{idx + 1 + (currentPage - 1) * pageSize}</td>
                <td>{fixture.player1}</td>
                <td>vs</td>
                <td>{fixture.player2}</td>
                <td>
                  <input type="text"
                   className='player-score' 
                   value={fixtureScores[fixture._id]?.player1 || ''} 
                   onChange={(e) => handleScoreChange(fixture._id, 'player1',(e.target.value))}          />      
                   </td>
                <td>
                  <input type="text"
                   className='player-score'
                   value={fixtureScores[fixture._id]?.player2 || ''}
                   onChange={(e) => handleScoreChange(fixture._id, 'player2', (e.target.value))}                    />
                 </td>
                <td>
                  
                  <button onClick={(e) => handleResultSubmit(e, fixture._id)}>Record</button>
                  
                </td>

            </tr>
        ))
    }
  </tbody>
</table>
</div>

{totalPages > 1 && (
    <div className="pagination">
      <button 
      className='btn bg-orange-600 text-white'
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span >
        Page {currentPage} of {totalPages}
      </span>
      <button
        className='btn bg-orange-600 text-white'
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )}
</>
    )
}


</div>)}
    </>
    
  )
}

export default FixtureList