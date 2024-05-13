import GameResults from "../models/gameResultsModels.js";

export const gamesFor = async(req,res) => {
    const userId = req.params.userId;

    try {
      const games = await getGames(userId); 
      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching games' });
    }
  
}

export const longestWinningStreak = async (req,res) => {
  const userId = req.params.userId;

  try {
    const games = await getGames(userId);

    let currentWinningStreak = 0;
    let longestWinningStreak = 0;

    for(const game of games) {
        
      const userWin = game.winner._id.toString() === userId.toString();
     
      if(userWin) {
        currentWinningStreak++;
      } else {
        currentWinningStreak = 0;
      }
      
      longestWinningStreak =Math.max(longestWinningStreak, currentWinningStreak);

    }

    res.json(longestWinningStreak)
  } catch (error) {
    
  }
}

const getGames = async(userId) => {
        try {
          
          const games = await GameResults.find({
            $or: [{ player1: userId }, { player2: userId }],
          }).populate('player1 player2 winner'); 
      
          return games;
        } catch (error) {
          console.error(error);
          throw new Error('Error fetching games for user'); 
        }
}