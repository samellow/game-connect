import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const useGetData = () => {
const [loading, setLoading] = useState(false)
const [topPlayer, setTopPlayer] = useState({})


useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
        try {
            const topPlayerRes= await  fetch(`/api/ranking/topPlayer`)
           const topPlayerData = await topPlayerRes.json()
            
           setTopPlayer(topPlayerData)
        } catch (error) {
            console.log(error.message)
            toast.error('Error fetching data')
        } finally{
            setLoading(false)
        }
    }
    fetchData()
},[]);

return {topPlayer, loading}
}

export default useGetData