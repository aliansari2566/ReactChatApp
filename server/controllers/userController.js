const User = require("../model/userModel")
const bcrypt = require("bcrypt");

// API FOR REGISTERATION
 module.exports.register = async (req, res, next) => {
 try {
  const {username , email , password} = req.body;
  const usernameCheck = await User.findOne({username});
  if (usernameCheck) {
    return res.json({msg:"Username already used", status: false });
  }
  const emailCheck = await User.findOne({email});
  if (emailCheck) {
    return res.json({msg:"email already used", status: false });
   
  }
  const hashedpassword = await  bcrypt.hash(password, 10)
 const  user = await User.create({ 

  username,
  email,
  password:hashedpassword,
 })
 delete user.password;
 return res.json({status: true, user});
 } catch (error) {
  next(error)
 }
  };

  
  // API FOR lOGIN
 module.exports.login = async (req, res, next) => {


try {
const {username ,  password} = req.body;
const user = await User.findOne({username});
if (!user) {
  return res.json({msg:"incorrect username or password", status: false });
 
}
const isPasswordValid = await bcrypt.compare(password,user.password)
if (!isPasswordValid) {
  return res.json({msg:"incorrect username or  password ", status: false });
  delete user.password;
}

return res.json({status: true, user});
} catch (error) {
next(error)
}
};


  // API FOR SetAvatar
 module.exports.setAvatar = async (req, res, next) => {


try {
const {username ,  password} = req.body;
const user = await User.findOne({username});
if (!user) {
  return res.json({msg:"incorrect username or password", status: false });
   
}
const isPasswordValid = await bcrypt.compare(password,user.password)
if (!isPasswordValid) {
  return res.json({msg:"incorrect username or  password ", status: false });
  delete user.password;
}

return res.json({status: true, user});
} catch (error) {
next(error)
}
};