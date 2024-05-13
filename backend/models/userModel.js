import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		profilePic: {
			type: String,
			default: "",
		},
		isAdmin: {
        type: Boolean,
        default: false 
   		}, 
		
			wins: {
				type: Number,
			}, 
			draws: {
				type: Number,
			},
			losses: {
				type: Number,
			},
			gamesPlayed: {
				type: Number,
			},
			avgPoints: {
				type: Number,
			}
		

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;