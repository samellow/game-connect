export const generateRoundRobin = (players) =>{
    const numParticipants = players.length;

    const fixtures = []

    
  for (let i = 0; i < numParticipants; i++) {
    for (let j = i + 1; j < numParticipants; j++) {
        fixtures.push({
            player1: players[i], 
            player2: players[j],
            
            
            

        });
    }
  }
   
  return fixtures;
}