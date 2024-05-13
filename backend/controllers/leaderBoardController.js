import User from "../models/userModel.js"
import {calculateRankingMetrics } from "../utils/calculateRankingMetrics.js";

export  const leaderBoard = async(req,res) =>{
   
   try {  

        const rankedUsers = await rankingUsers()
    // const update = await updateUserRankingMetrics()
    //   const rankedUsers = await User.find().sort({ avgPoints: -1 }); 

       res.json(rankedUsers);
   } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
   }
   
  
}

export const topPlayer = async (req, res) => {
  try {
        const rankedUsers  = await rankingUsers();

        if(rankedUsers.length > 0 && rankedUsers) {
        const topPlayer = rankedUsers[0]; 
        res.json(topPlayer);}
        else {
            res.status(500).json({message: "Error fetching users"})
        }
  } catch (error) {
    res.status(500).json({message: "Error fetching users"})

  }
}

const updateUserRankingMetrics = async (req, res) =>{
   try {
    const users  = await User.find()
 
    const usersToUpdate = users.map((user) => {
        
        const rankingMetrics = calculateRankingMetrics(user);
        return {
          updateOne: {
            filter: { _id: user._id },
            update: { $set: { gamesPlayed: rankingMetrics.gamesPlayed, avgPoints: rankingMetrics.avgPoints } },
          },
        };
      });

      await User.bulkWrite(usersToUpdate);
   } catch (error) {
    console.log(error.message)
   }
   
}

const rankingUsers = async (req, res)=>{
  try {
      const update = await updateUserRankingMetrics()
      const rankedUsers = await User.find().sort({ avgPoints: -1 }); 

      return rankedUsers
  } catch (error) {
    console.log(error.message);
  }
}