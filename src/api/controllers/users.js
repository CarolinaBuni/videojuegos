const { generateSign } = require( "../../config/jwt" );
const User = require( "../models/users" );
const bcrypt = require("bcrypt")

const getUsers = async (req, res, next) => {
     try {
          const users = await User.find();
           return res.status(200).json(users);
     } catch (error) {
          return res.status(400).json(error);
     }
};


const register = async (req, res, next) => {
     try {
          const newUser = new User({
               userName: req.body.userName,
               password: req.body.password,
               email: req.body.email,
               rol: "user",
          });


          const userDuplicated = await User.findOne({ userName: req.body.userName });

          if(userDuplicated){
               return res.status(400).json("Ese usuario ya existe");
          }

          const userSaved = await newUser.save();
          return res.status(201).json(userSaved);
     } catch (error) {
          return res.status(400).json(error);
     }
};


const login = async (req, res, next) => {
     try {
          const user = await User.findOne({ userName: req.body.userName });
          if(user){
               if(bcrypt.compareSync(req.body.password, user.password)){
                    const token = generateSign(user.userName, user._id);
                    return res.status(200).json({ user, token });
               } else {
                    res.status(400).json("Usuario o contraseña erróneos")
               }
          } else { 
               return res.status(400).json("Usuario o contraseña no existe");
          }


     } catch (error) {
          return res.status(400).json("Usuario o contraseña inexistente");
     }
}

module.exports = { getUsers, register, login };