import Fixtures from "../models/fixturesModel.js";
import Tournament from "../models/tournamentModel.js";
import TournamentResults from "../models/tournamentResultsModel.js";

export const tournamentResults = async (req,res) => {
    try {
        const {tournamentId, fixtureId, player1Score, player2Score} = req.body;

        if(!tournamentId || !fixtureId || !player1Score || !player2Score){
            return res.status(400).json({message: 'Fill all fields'})
        }

        const tournament = await Tournament.findById(tournamentId);

        if(!tournament){return res.status(404).json({message: 'Tournament not found'}) }

        const fixture = await Fixtures.findById(fixtureId);

        
        if(!fixture){return res.status(404).json({message: 'Fixture not found'}) }
        //check if fixture is populated 


    const availableResults = await TournamentResults.findOne({
            tournamentId,
            fixtureId
        })

        if(availableResults){
            return res.status(400).json({message: 'Results already recorded'})
        }
        const tournamentResults = new TournamentResults({
            tournamentId,
            fixtureId,
            player1Score,
            player2Score
        })

        await tournamentResults.save();

        // Update tournament model
        tournament.results.push(tournamentResults._id);
        await tournament.save();

        res.status(201).json({ tournamentResults });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error recording results'})
    }
}