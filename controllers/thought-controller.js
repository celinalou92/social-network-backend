const { Types } = require('mongoose');
const { User, Thought } = require('../models');

const thoughtController = {

// /api/thought
// get all thoughts 
 getAllThoughts(req, res) {
     Thought.find({})
     .then(dbThoughtData => res.json(dbThoughtData))
     .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
 },
// get a single thought by its _id
 getThoughtById({ params}, res) {
     Thought.findOne({_id: params.thoughtId})
     .then(dbThoughtData => {
        // if no user is found send 404
        if(!dbThoughtData){
            res.status(404).json({ message: 'No thought found with this id!' });
        return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
 },

// post to create a new thought(push created thought's _id to the associated user's thoughts)
 addThought({ params, body }, res) {
    console.log(body)
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
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

// example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

// put to update thought by its _id
 updateThought({ params, body }, res) {
     Thought.findOneAndUpdate({ _id: params.thoughtId  }, body, { new: true })
     .then(dbThoughtData => {
         console.log(params)
        if(!dbThoughtData){
          res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData)})
     .catch(err => res.status(400).json(err))
 },


// delete to remove a thought by its id
 deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
        if(!dbThoughtData){
          res.status(404).json({ message: 'No thought found with this id!' });
      }
        res.json(dbThoughtData)})
    .catch(err => res.status(400).json(err))
 },


// ------ reaction routes ------ //
// post to create a reaction stored ina single thought's array 
 addReaction({ params, body }, res) {
     console.log(body)
     Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true } 
     )
     .then(dbThoughtData => {
        if(!dbThoughtData){
          res.status(404).json({ message: 'No thought found with this id!' });
      }
        res.json(dbThoughtData)})
    .catch(err => res.status(400).json(err))
 },


// delete to pull and remove a reaction by the reaction's reactionId

};

module.exports = thoughtController;