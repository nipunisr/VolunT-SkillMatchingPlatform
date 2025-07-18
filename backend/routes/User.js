const express = require("express");
const router = express.Router();

const { GetAllUsers, GetUser, DeleteUser, AddUser, updateUserProfile ,SendRequestController,UpdateProfile,updateCredentials} = require("../controllers/User");

router.post("/addUser", AddUser);
router.put('/update/:userId', updateUserProfile);


module.exports = router;