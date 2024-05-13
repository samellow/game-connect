import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom'


const useRecordGames = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const recordGames = async({player1, player2, player1Score, player2Score})=>{
        const success = handleInputErrors({  player1, player2, player1Score, player2Score });
		if (!success) return;
        setLoading(true)
        
        try {
            const res = await fetch('/api/games', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({player1, player2, player1Score, player2Score})

            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            console.log(data)
            toast.success('Match saved successfully')
            navigate('/gamesRecord')
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }finally {
            setLoading(false)
        }
    }
    return { loading, recordGames}
  
}

export default useRecordGames

function handleInputErrors({  player1, player2, player1Score, player2Score }) {
	if (!player1 || !player2 || !player1Score || !player2Score ) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (player1 === player2) {
		toast.error("Player cannot play against himself");
		return false;
	}

	return true;
}