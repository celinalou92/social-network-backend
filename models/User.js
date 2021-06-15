const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
                {
                type: Schema.Types.ObjectId,
                // might run into problems here
                ref: 'User'
            }
        ]    
    },
    {
        toJSON: {
            virtuals: true,
        },
        // not sure what this means
        id: false
    }
);

// add virtual here that retrienves the length of user's array field on query 
// UserSchema.virtual('friendCount').get(functoin(){>insert code<});


// create the User model using UserSchema
const User = model('User'. UserSchema);

// export User model
module.exports = User;