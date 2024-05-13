import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useGetGamesForUser = () => {
 const [loading, setLoading] = useState()
 const [gamesFor, setGamesFor] = useState()
 
  const {authUser} = useAuthContext()

 useEffect(()=>{
    const getGamesFor = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/gamesFor/${authUser._id}`)
            const data = await res.json();
            setGamesFor(data)
        } catch (error) {
            console.log(error.message)
            toast.error('Error fetching games for user')
        } finally{
            setLoading(false)
        }
    }
    getGamesFor()
 },[])

 useEffect(()=>{
    const getWinningStreak = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/gamesFor/streak/${authUser._id}`)
            const data = await res.json()
            setWinningStreak(data)
             
        } catch (err) {
            console.log(err)
        } finally{
            setLoading(false)

        }
    }
    getWinningStreak()
},[])
 return {gamesFor, loading}
}

export default useGetGamesForUser