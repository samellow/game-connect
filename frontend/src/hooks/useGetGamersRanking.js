import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import GamersRankingContext from '../context/GamersRankingContext';

const useGetGamersRanking = () => {
    const [loading, setLoading] = useState(false)

    const { setGamers } = useContext(GamersRankingContext)
    useEffect(() => {
        const getGamersRanking = async () => {
            setLoading(true)
          try {
            const response = await fetch('/api/ranking');
            if (!response.ok) {
              throw new Error(`Error fetching users: ${response.statusText}`);
            }
            const data = await response.json();
            localStorage.setItem("gamers", JSON.stringify(data));

            setGamers(data);
          } catch (error) {
            console.error('Error fetching users:', error.message);
            toast.error('Error fetching users')
          } finally {
            setLoading(false)
          }
        };
    
        getGamersRanking();
      }, []);

      return { loading, gamers}
}

export default useGetGamersRanking