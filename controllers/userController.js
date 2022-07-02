const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // GET all user
    getUser(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // GET a single user
    getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(async (user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},
    // CREATE a new user
    createUser(req, res) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a user
    deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No such user exists' })
            : User.findOneAndUpdate(
                { user: req.params.userId },
                { $pull: { user: req.params.userId } },
                { new: true }
            )
    )
    .then((thought) =>
        !thought
            ? res.status(404).json({
                message: 'User deleted, but no thought found',
            })
            : res.json({ message: 'User successfully deleted' })
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },
    // UPDATE a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
        )
            .catch((err) => res.status(500).json(err));
    },

    // ADD friend
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friend: req.body } },
            { runValidators: true, new: true }
    )
    .then((user) =>
        !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },
    // DELETE friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { reaction: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
    )
    .then((user) =>
        !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },
};
