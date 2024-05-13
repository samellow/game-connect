import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import { Home, Login, Signup, Profile, ChatHome, Tournaments } from './pages';
import { Toaster } from 'react-hot-toast'
import './App.css'
import { useAuthContext } from './context/AuthContext';
import GamesRecord from './pages/gamesRecord/GamesRecord';
import { UserDashBoard } from './components';
import LeaderBoard from './pages/leaderBoard/LeaderBoard';
import MyGames from './pages/myGames/MyGames';
import CreateTournament from './pages/createTournament/CreateTournament';


const App = () => {
const { authUser } = useAuthContext();

  return (
<>


 <Toaster position = "bottom-right" toastOptions={{duration: 2000}}/>
   <Routes>
      <Route path= '/' element = {<Home />}/>
      <Route path='/signup' element = {authUser ? <Navigate to= '/profile'/> : <Signup></Signup> }/>
      <Route path='/login' element = {authUser? <Navigate to = '/profile'/> : <Login />}/>
      <Route path='/profile' element = {authUser? <Profile /> : <Navigate to = '/'/>} />
      <Route path='/chat' element= {authUser ? <ChatHome></ChatHome>: '/'}></Route>
      <Route path='/gamesRecord' element= {authUser ? <GamesRecord/>: '/'}></Route>
      <Route path='/userDashboard' element= {authUser ? <Profile/> : '/'}></Route>
      <Route path='/leaderBoard' element= {authUser ? <LeaderBoard/> : '/'}></Route>
      <Route path='/myGames' element= {authUser ? <MyGames/> : '/'}></Route>
      <Route path='/tournaments' element= {authUser ? <Tournaments/> : '/'}></Route>
      <Route path='/createTournament' element= {authUser ? <CreateTournament/> : '/'}></Route>


   </Routes>
 
 </>
  )
}

export default App