const { Schema, model } = require('mongoose');
const userSchema = require('./User');

// Schema to create USER model
const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, "Please enter a valid email address"],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address",],
    },
    thought: [ 
        {
        type: Schema.Types.ObjectId,
        ref: "Thought",
        },
    ],
    friend: [ 
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    },
    {
    toJSON: {
        getters: true,
    },
    }
);

// Virtual to retrieve the length of the user's friends array
userSchema.virtual('friendCount')
.get(function() {
    return this.friend.length;
})

const User = model('User', userSchema);

module.exports = User;
