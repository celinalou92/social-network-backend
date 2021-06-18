const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtById, 
    addThought, 
    updateThought, 
    deleteThought,
    addReaction
  } = require('../../controllers/thought-controller');


// Set up GET all and POST at /api/thought/:userId
router
  .route('/:userId')
  .get(getAllThoughts)
  .post(addThought);


router
  .route('/')
  .get(getAllThoughts);
  
  router
  .route('/thought/:thoughtId')
  .put(updateThought)

// Set up GET one, PUT, and DELETE at /api/:userId/:thoughtId
router
  .route('/:userId/:thoughtId')
  .get(getThoughtById)
  .delete(deleteThought)
  .post(addReaction);



// remove reaction route you'll need to create a new route for this one, because you'll need the id of the individual reply, not just its parent.
// router.route('/:userId/:thoughtId/:reactionId').delete(removeReply);


module.exports = router;