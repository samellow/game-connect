import { createContext, useState, useEffect } from "react";

 const GamersRankingContext = createContext();

export const useGamersRankingContext = () =>{
  
    return useContext(GamersRankingContext)
}

export const GamersRankingContextProvider = ({ children }) => {
    const [gamers, setGamers] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getGamersRanking = async () => {
            setLoading(true)
          try {
            const response = await fetch('/api/ranking');
            if (!response.ok) {
              throw new Error(`Error fetching users: ${response.statusText}`);
            }
            const data = await response.json();
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

      return (
        <GamersRankingContext.Provider value={{ gamers, setGamers, loading, setLoading}}>
                { children}
        </GamersRankingContext.Provider>
      )
};

export default GamersRankingContext