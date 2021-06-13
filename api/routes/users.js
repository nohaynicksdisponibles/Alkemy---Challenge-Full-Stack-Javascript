const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User,Operation} = require("../models/index")
//const cont = bcrypt.hashSync(req.body.contrasenia,10);

router.post('/signup', function (req,res) {
  
})

router.post('/login', function(req, res) {
  const user = await User.findOne({where:{name:req.body.mail}})
  if(user===null){
    res.json({err:"El usuario es inexistente"})
  }else{
    if(!bcrypt.compareSync(req.body.password,user.password)){
      return res.status(400).json({
          err: "La contraseña es invalida"
      });
    }else{
                
      const token = jwt.sign({ user }, process.env.KEY,{expiresIn:"30 days"});

      return res.json({
          result:{id:user.id,name:user.name},
          token: token
      });
    } 
  }
});

module.exports = router;
