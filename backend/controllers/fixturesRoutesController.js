import Fixtures from "../models/fixturesModel.js";
import Tournament from "../models/tournamentModel.js";
import { generateRoundRobin } from "../utils/generateRoundRobin.js";
import { shuffleFixtures } from "../utils/shuffleFixtures.js";

export const generateFixtures = async(req,res) =>{
 try {
    const { tournamentId} = req.body;

    if (!tournamentId){return res.status(404).json({message: 'missing tournament id'});}

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament){return res.status(404).json({message: 'tournament not found'});}

    const players = tournament.players;

    const fixtures = generateRoundRobin(players);
   
    const shuffledFixtures = shuffleFixtures(fixtures);

    const newFixtures = shuffledFixtures.map((fixture) => {
        return {
          ...fixture,
          tournamentId: tournament._id,
        };
      });
      
      const finalFixtures = await Fixtures.insertMany(newFixtures);
      
    //update tournament model 

    tournament.fixtures = finalFixtures.map((fixture) => fixture._id);
    await tournament.save();

    res.status(201).json(finalFixtures);
 } catch (error) {
    console.log(error.message)
    res.status(500).json({message: 'Error generating fixtures'})
 }
}
