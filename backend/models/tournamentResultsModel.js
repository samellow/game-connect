import mongoose from "mongoose";

const tournamentResultsSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },

    fixtureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fixtures",
        required: true
    },

    player1Score: {
        type: Number,
        required: true
    },
    player2Score: {
        type: Number,
        required: true
    },

}, {timestamps: true});

const TournamentResults = mongoose.model("TournamentResults", tournamentResultsSchema);

export default TournamentResults;