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

// /api/students/:userId/friend/:friendId POST, DELETE
router.route('/:userId/friend/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
