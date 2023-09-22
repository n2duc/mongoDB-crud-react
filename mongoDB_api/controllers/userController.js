const User = require("../models/userModel");

const userController = {
    //Add new user
    addUser: async (req, res) => {
        try {
            let user = new User(req.body);
            let savedUser = await user.save();
            res.status(200).json(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUsers: async (req, res) => {
        try {
            let users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUser: async (req, res) => {
        let id = req.params.id
        try {
            let user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            const updateUser = await User.findById(req.params.id);
            await updateUser.updateOne({ $set: req.body })
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    removeUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.json(deletedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = userController;