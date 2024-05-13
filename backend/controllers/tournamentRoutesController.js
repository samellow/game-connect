import mongoose from "mongoose";
import Tournament from "../models/tournamentModel.js";


export const newTournament = async(req, res) => {
    try {
        // if(!req.isAdmin) {
        //     return res.status(401).json({message: "You are not authorized to create tournaments"})
        // }

        const { tournamentName , players} = req.body;

        if(!tournamentName || !players) {
            return res.status(400).json({message: "Please provide tournament name and players"})
        }

        

        const existingTournament = await Tournament.findOne( {tournamentName});
        
        if(existingTournament) {
            return res.status(400).json({message: "Tournament name already exists"})
        }

        const tournament = new Tournament({
            tournamentName,
            players,

        })

        await tournament.save();

        res.status(201).json({ tournament });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error creating tournament'})
    }
}








