
//User model
const User = require('../model/User.js');


//Signing up the user
exports.get_users =  async (req, res) => {
      console.log('Getting user list');
      const users = await User.find().exec();
      res.json(users);
 };
   
