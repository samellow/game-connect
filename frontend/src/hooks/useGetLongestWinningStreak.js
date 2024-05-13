import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const useGetLongestWinningStreak = () => {

    const [loading, setLoading] = useState()
    const [winningStreak, setWinningStreak] = useState()
    const {authUser} = useAuthContext()
   

    return {winningStreak, loading}
    
  
}

export default useGetLongestWinningStreak