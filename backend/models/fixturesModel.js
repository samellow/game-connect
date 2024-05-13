import mongoose from "mongoose";

const fixtures = new mongoose.Schema({
    tournamentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },
    player1: {
        type: String,
        required: true
    },
    player2: {
        type: String,
        required: true
    },

}, {timestamps: true})

const Fixtures = mongoose.model('Fixtures', fixtures);

export default Fixtures;