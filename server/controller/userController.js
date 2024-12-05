import User from "../model/userModel.js";
import mongoose from 'mongoose';
//api 1st for insertingr
export const create = async (req, res) => {
    try {
        // Validate the request body to ensure it has the necessary fields
        if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        // Create a new User instance
        const userData = new User(req.body);

        // Save the user data to the database
        const savedData = await userData.save();

        // Respond with the saved data
        res.status(200).json(savedData);
    } catch (error) {
        console.error("Error creating user:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with the error message
    }
}
//api 2nd for testing


export const getALL = async (req, res) => {
    try {
        const userData = await User.find(); // data fetch from userModel
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//api 3rd for getting user by their id
export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Check if the provided ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid user ID format" });
        }
        
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(userExist);
    } catch (error) {
        console.error("Error fetching user:", error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};
//api 4th for updating the data
export const update = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the provided ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid user ID format" });
        }

        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({msg:"User updated successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//api 5th for deleting the data 
export const deleteUser=async(req,res)=>{
    try{
        const id=req.params.id
        const userExist = await User.findById(id);
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid user ID format" });
        }
       
        await User.findByIdAndDelete(id)
        res.status(200).json({msg:"User deleted successfully"})


    }catch(error){
        res.status(500).json({error:error.message})
    }
}