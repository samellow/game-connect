import GameResults from "../models/gameResultsModels.js";
import User from "../models/userModel.js";

export const gameResults = async(req,res) => {
    try {
        const { player1, player2, player1Score, player2Score} = req.body;

        if(!player1 || !player2 || !player1Score || !player2Score){
            return res.status(400).json({message: 'Fill all fields'})
        }

        //find player documents
        const [player1Doc, player2Doc] = await Promise.all([
            User.findOne({username: player1}).select("_id"),
            User.findOne({username: player2}).select("_id"),
        ]);


        //checking if players exist 

        if(!player1Doc || !player2Doc) {
            return res.status(404).json({message: 'Player does not exist'})
        }
        
        //case of a draw 
        const draw = player1Score === player2Score || null;
        //calculating winner 

        let winner = null;
        if(player1Score > player2Score){
            winner = player1Doc._id;
        }
        if(player2Score > player1Score){
            winner = player2Doc._id;
        }
        if(draw) {
            winner = null
        }
         


        // creating the score 
        const score = `${player1Score}:${player2Score}`;
        //create a new game result document

        const newGameResults = new GameResults({
            player1: player1Doc._id,
            player2: player2Doc._id,
            player1Score,
            player2Score,
            winner,
            draw,
            score,
        })

        //save the match 

        const savedGameResult = await newGameResults.save();

        if(!savedGameResult){
            return res.status(500).json({message: 'Error saving game'});
        }

        //updating user wins/losses

        await Promise.all([
            User.findByIdAndUpdate(player1Doc._id, {$inc: {wins: winner=== player1Doc._id ? 1 : 0, losses: winner === player2Doc._id? 1 : 0, draws: draw ? 1 : 0 }}),
            User.findByIdAndUpdate(player2Doc._id, {$inc: {losses: winner=== player1Doc._id ? 1 : 0, wins: winner === player2Doc._id? 1 : 0, draws: draw ? 1 : 0}})

        ])

        res.status(201).json(newGameResults)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message})
    }
}

