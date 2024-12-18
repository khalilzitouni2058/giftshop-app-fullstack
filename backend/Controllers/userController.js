
const User = require("../model/User");
const userRoute = require("../Routes/userRoute");
const Logs  = require("../model/Logs")
const getUsers = async(request,response) => {
    try{
        const users = await User.find()
        if(users && users.length>0){
            response.status(200).json({users : users});
        }else{
            response.status(404).json({msg: "No users found"});
        }
    }catch(error){
        console.error(error);
        response.status(500).json({msg:"Error onn getting users"});
    }
};

const getOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const foundUser = await User.findById(id);
        if (foundUser) {
            res.status(200).json({ user: foundUser });
        } else {
            res.status(404).json({ msg: "No user found with the given ID" });
        }
    }catch (error) {
        res.status(500).json({ msg: "Error on retrieving the user" });
    }
    };
   

const postUser = async (request, response) => {
    const user = request.body;
    try {
        const foundUser = await User.findOne({ email: user.email });
        if (foundUser) {
            response.status(400).json({ msg: "user already exist" });
        } else {
            const newUser = new User(user)
            console.log(newUser)
            await newUser.save();
            response.status(200).json({ user: newUser, msg: " user successfully added"});
        }
    }catch (error) {
        console.error(error);
        response.status(500).json({ msg: "error on adding user" });
    }
};

const putUser = async (req, res) => {
    const id=req.params.id;
    const user=req.body
    console.log(user)
    try {
        await User.findByIdAndUpdate(id,user)
        res.status(200).json({ msg: "update success" });
    }catch (error){
        res.status(400).json({ msg: "error on updating user" });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ msg: "delete done" });
    } catch (error) {
        res.status(500).json({ msg: "error on deleting user" });
    }
};
const jwt = require("jsonwebtoken");
require('dotenv').config();
const signIn = async (req, res) => {
    const user = req.body;
    try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
    if (user.password === foundUser.password) {
    const token = jwt.sign(
    { id: foundUser._id, role: foundUser.role },
    process.env.JWT_SECRET
    );
    res.status(200).json({ user: foundUser, token: token });
    } else {
    res.status(400).json({ msg: "Wrong password" });
    }
    } else {
    return res.status(400).json({ msg: "User not registered" });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
    }
    };        

    
    const getFavorites = async (req, res) => {
        try {
          const { userId } = req.query; // Retrieve userId from query params
          const user = await User.findOne({ _id: userId }); 
            console.log
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          res.status(200).json(user.favorites); // Respond with the favorites
        } catch (error) {
          res.status(500).json({ message: "Error fetching favorites", error });
        }
      };
      const addFavorite = async (req, res) => {
        try {
            let { userId, productId } = req.query;
            
            // Trim any extra whitespace or newline characters
            productId = productId.trim();
    
            // Find the user by userId
            const user = await User.findOne({ _id: userId });
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Check if the product is already in the favorites list
            if (user.favorites.includes(productId)) {
                return res.status(400).json({ message: "Product already in favorites" });
            }
    
            // Add the productId to the favorites list
            user.favorites.push(productId);
    
            // Save the user document with the updated favorites list
            await user.save();
    
            res.status(200).json({ message: "Product added to favorites", favorites: user.favorites });
        } catch (error) {
            res.status(500).json({ message: "Error adding product to favorites", error });
        }
    };
    const removeFavorite = async (req, res) => {
        try {
            let { userId, productId } = req.query;
            
            // Trim any extra whitespace or newline characters
            productId = productId.trim();
    
            // Find the user by userId
            const user = await User.findOne({ _id: userId });
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Check if the productId is in the favorites list
            const productIndex = user.favorites.indexOf(productId);
            if (productIndex === -1) {
                return res.status(400).json({ message: "Product not in favorites" });
            }
    
            // Remove the productId from the favorites list
            user.favorites.splice(productIndex, 1);
    
            // Save the updated user document
            await user.save();
    
            res.status(200).json({ message: "Product removed from favorites", favorites: user.favorites });
        } catch (error) {
            res.status(500).json({ message: "Error removing product from favorites", error });
        }
    };
    const postLogs = async (req, res) => {
        try {
          const logData = req.body;
      
          // Create and save a new log
          const log = new Logs(logData);
          await log.save();
      
          res.status(201).json(log);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
    
    
module.exports = { getUsers, postUser, putUser, deleteUser, getOneUser, signIn, getFavorites,addFavorite ,removeFavorite,postLogs};

