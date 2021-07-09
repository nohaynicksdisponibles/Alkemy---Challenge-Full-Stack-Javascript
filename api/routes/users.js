const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require("../models/index")

router.post('/signup', async function (req,res) {
  const user = await User.findOne({where:{mail:req.body.mail}})
  if(user){
    return res.json({err:"El mail ya se encuentra registrado"})
  }else{
    const password = bcrypt.hashSync(req.body.password,10);
    const user = await User.create({name:req.body.name,mail:req.body.mail,password})

    const token = jwt.sign({ user }, process.env.KEY,{expiresIn:"30 days"});

    return res.json({
        result:{id:user.id,name:user.name},
        token: token
    });
  }
})

router.post('/login', async function(req, res) {
  const user = await User.findOne({where:{mail:req.body.mail}})
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
