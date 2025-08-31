const { AddNewUser } = require("../services/User");
  
  
  const AddUser = async (req, res) => {
    const user = req.body;
    console.log(user,"line 6")
    const newUser = await AddNewUser(user);
      return res.json(newUser);
  };
  
  module.exports = {
    AddUser
   };