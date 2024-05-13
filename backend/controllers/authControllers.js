import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { username, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);


		const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

		const newUser = new User({
			username: username ,
			password: hashedPassword,
			profilePic: profilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const login = async (req,res)=>{
  try {
	const { username, password} = req.body;
	const user = await User.findOne({ username })
	const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
     
	if(!user || !isPasswordCorrect){
		return res.status(400).json({ error: 'invalid credentials'})
	}

	

	generateTokenAndSetCookie(user._id, res)

	res.status(201).json({
		_id: user._id,
		username: user.username,
		profilePic: user.profilePic,
		isAdmin: user.isAdmin,
		wins: user.wins, 
		losses: user.losses,
		draws: user.draws,
		avgPoints: user.avgPoints,
	})

  } catch (error) {
	res.status(500).json({error: error.message});
  }
};

export const logout = (req,res) => {
    try {
		res.cookie('jwt', "", { maxAge: 0});
		res.status(200).json({message: 'logged out successfully'});
	} catch (error) {
		res.status(500).json({error: 'internal Server Error'})
	}
}