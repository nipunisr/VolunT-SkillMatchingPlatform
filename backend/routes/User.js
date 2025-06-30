const express = require("express");
const router = express.Router();

const { GetAllUsers, GetUser, DeleteUser, AddUser, UpdateUser ,SendRequestController,UpdateProfile,updateCredentials} = require("../controllers/User");

router.post("/addUser", AddUser);


module.exports = router;