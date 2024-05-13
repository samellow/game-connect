import mongoose from 'mongoose'

const gameResultsSchema = new mongoose.Schema({

    
    
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    draw: {
        type: Boolean,
        default: null
    },
    score: {
        type: String,
        required: true
    }

    
}, {timestamps: true})

const GameResults = mongoose.model('gameResults', gameResultsSchema)

export default GameResults;