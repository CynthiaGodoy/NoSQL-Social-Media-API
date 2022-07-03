const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction, 
} = require('../../controllers/thoughtController.js');

// /api/thought GET, POST
router.route('/').get(getThought).post(createThought);

// /api/thought/:thoughtId GET, PUT, DELETE
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thought/:thoughtId/reaction POST
router.route('/:thoughtId/reaction').post(createReaction);

// /api/thought/:thoughtId/reaction/:reactionId  DELETE
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
