const { Schema, model } = require('mongoose');

// Schema to create a Reaction model
const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
    }
);

// Schema to create a Thought model
const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reaction: [reactionSchema],
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
    }
);

// Virtual that retrieves the length of the thoughts reactions array field on query
thoughtSchema.virtual('reactionCount')
// Getter
.get(function() {
    return this.reaction.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
