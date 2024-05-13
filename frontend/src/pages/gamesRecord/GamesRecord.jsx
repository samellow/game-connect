import React, { useEffect, useState } from 'react'
import './gamesRecord.css'
import { ProfileSidebar } from '../../components'
import useRecordGames from '../../hooks/useRecordGames'
const GamesRecord = () => {
    const [data, setData] = useState({
        player1: '',
        player2: '',
        player1Score: '',
        player2Score: ''
    })
    const {loading, recordGames} = useRecordGames()

    const recordGame = async (e) =>{
         e.preventDefault();
            await recordGames(data);
            setData({
              player1: '',
              player2: '',
              player1Score: '',
              player2Score: ''
            });
    }
  return (
    <div  className='games-record-page'>
    <ProfileSidebar className="games-sidebar"></ProfileSidebar>
    <div className='games-record-form'>
    <form onSubmit={recordGame}>
      <div className="form-content">
        <p className="form-header">Record Game</p>
        <br />
        <div className="drop-down-menus">

        <span className="subtitle"> player 1</span>
        <input type="text"  className='data-input' value={data.player1}   onChange = {(e)=> setData({...data, player1: e.target.value})}/>
        <br />
        <span className="subtitle">player 2</span>
        <input type="text"  className='data-input'  value={data.player2} onChange = {(e)=> setData({...data, player2: e.target.value})}/>
          </div>
      <br />
      <span className="subtitle">Player 1 score</span>

        <input type="text"  className='data-input' value={data.player1Score}  onChange = {(e)=> setData({...data, player1Score: e.target.value})}/>
        <br />
        <span className="subtitle">Player 2 score</span>
        <input type="text"    className='data-input'  value={data.player2Score} onChange = {(e)=> setData({...data, player2Score: e.target.value})}/>
        <br />
        <input type="submit" value = {loading ? '...' : "Record Match"} className='btn bg-orange-600 text-white'  disabled={loading} /> 
      </div>
        
    </form>
    </div>
    </div>
  )
}

export default GamesRecord