import Tournament from "../models/tournamentModel.js"
import TournamentResults from "../models/tournamentResultsModel.js"
import Fixtures from "../models/fixturesModel.js"

export const getTournamentRanking = async (req,res) => {
    try {
        const {tournamentId} = req.body

        if(!tournamentId){
            return res.status(404).json({message: 'Missing tournament id'})
        }

        const tournamentResults  = await TournamentResults.find({ tournamentId})
        .populate({ path: 'fixtureId', select: 'player1 player2' })
        if(!tournamentResults){
            return res.status(404).json({message: 'tournament results not found'})
        }

        const playerRankings = {};
        for (const result of tournamentResults) {
          const { player1, player2} = result.fixtureId;
          const { player1Score, player2Score } = result
    
        
          const player1Points = player1Score > player2Score ? 3 : (player1Score === player2Score ? 1 : 0);
          const player2Points = player2Score > player1Score ? 3 : (player2Score === player1Score ? 1 : 0);

          const winner = player1Score > player2Score ? player1 : (player1Score === player2Score ? null : player2);
          const loser = winner === player1 ? player2 : player1;
    
          
          if (!playerRankings[player1]) {
            playerRankings[player1] = { name: player1, points: 0, goalsScored: 0, goalsConceded: 0, gamesPlayed: 0 , wins: 0, draws: 0, losses: 0 };
          }
          playerRankings[player1].points += player1Points;
          playerRankings[player1].goalsScored += player1Score;
          playerRankings[player1].goalsConceded += player2Score;
          playerRankings[player1].gamesPlayed++;
          if (winner === player1) {
            playerRankings[player1].wins++;
          } else if (winner === null) {
            playerRankings[player1].draws++;
          } else {
            playerRankings[player1].losses++;
          }
    
          if (!playerRankings[player2]) {
            playerRankings[player2] = { name: player2, points: 0, goalsScored: 0, goalsConceded: 0, gamesPlayed: 0, wins: 0, draws: 0, losses: 0 };
          }
          playerRankings[player2].points += player2Points;
          playerRankings[player2].goalsScored += player2Score;
          playerRankings[player2].goalsConceded += player1Score;
          playerRankings[player2].gamesPlayed++;
          if (winner === player2) {
            playerRankings[player2].wins++;
          } else if (winner === null) {
            playerRankings[player2].draws++;
          } else {
            playerRankings[player2].losses++;
          }
          
        }
    
        
        const rankedPlayers = Object.values(playerRankings);
        rankedPlayers.sort((a, b) => {
          
          if (a.points !== b.points) return b.points - a.points;
          
          return (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded);
        });
    
        
        if (!rankedPlayers.length) {
          return res.status(204).json({ message: 'No results found for this tournament' });
        }
    
        res.json(rankedPlayers);
    } catch (error) {
        res.json(error.message)
    }
}