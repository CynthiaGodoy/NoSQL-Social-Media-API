const { Thought, User } = require('../models');

// Aggregate function to get the number of reactions overall
const reactionCount = async () =>
    Reaction.aggregate()
        .count('reactionCount')
        .then((numberOfReactions) => numberOfReactions);

module.exports = {
    // GET all thoughts
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No Thought with that ID' })
                : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },
    // CREATE a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
        });
    },
    // DELETE a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : User.deleteMany({ _id: { $in: thought.user } })
            )
                .then(() => res.json({ message: 'Thought and user deleted!' }))
                .catch((err) => res.status(500).json(err));
    },
    // UPDATE a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
            .catch((err) => res.status(500).json(err));
    },

    // GET all reactions for count
    getReaction(req, res) {
        Thought.find()
            .then(async (thought) => {
            const thoughtObj = {
                thought,
                reactionCount: await reactionCount(),
            };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
        },

    // CREATE a reaction to a thought
    createReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body } },
            { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },







    // DELETE reaction to a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' })
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },
};
