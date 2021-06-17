const { User } = require('../models');

const userController = {
    // functions will go here as methods
    // -------- user -------//
// /api/users

// get all users
    getAllUsers(req, res) {
        User.find({})
        .populate('friends')
        .populate({
            path: 'thoughts',
            select: '-__v', 
          })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
// get a single user by _id and populate thought and friend data
    getUsersById({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
        .then(dbUserData => {
            // if no user is found send 404
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
// post a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }

// put update a user by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No users found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

// delete a user by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No users found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
  }


// bonus remove a user's associated thoughts when deleted



// ------ friends ------ //
// /api/users/:userId/friends/:friendId

// post to add a new friend to user's friend list


// delete to remove a friend from user's friend list
};



module.exports = userController;