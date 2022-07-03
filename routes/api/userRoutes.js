const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/user GET, POST
router.route('/').get(getUser).post(createUser);

// /api/user/:userId GET, PUT, DELETE
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friend POST
router.route('/:userId/friend').post(addFriend);

// /api/user/:userId/friend/:friendId DELETE
router.route('/:userId/friend/:friendId').delete(removeFriend);

module.exports = router;
