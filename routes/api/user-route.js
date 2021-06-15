const { User, Thought } = require('../../models')
const router = require('express').Router();

// -------- user -------//
// /api/users

// get all users
router.get('/api/users', (req, res) => {
    User.find({})
    .then(dbUserData => re.json(dbUserData))
    .catch(err => res.status(400).json(err))
})
// get a single user by _id and populate thought and friend data

// post a new user


// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }

// put update a user by its _id

// delete a user by its _id



// bonus remove a user's associated thoughts when deleted



// ------ friends ------ //
// /api/users/:userId/friends/:friendId

// post to add a new friend to user's friend list


// delete to remove a friend from user's friend list

// module.exports = router;