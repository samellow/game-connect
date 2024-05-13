export const calculateRankingMetrics = (user) =>{
     const gamesPlayed = user.wins + user.losses + user.draws
     const avgPointsBeforeRound = (user.wins * 3 + user.draws*1)/gamesPlayed;
     const avgPoints = avgPointsBeforeRound.toFixed(2)
      return {
        gamesPlayed,
        avgPoints
     }
    }