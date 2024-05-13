import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    players: 
        {
            type: [String] ,
            required: true
        }
    ,
    winner: {
        type: String,
        optional: true,
    },
    fixtures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fixtures',
      }],
      results: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'TournamentResults' }]

   
}, {timeStamps: true})

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;