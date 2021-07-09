const jwt = require('jsonwebtoken');

function middleWareJsonToken(req,res,next){
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, process.env.KEY, (err, decoded) => {      
        if (err) {
          return res.json({ err: 'Token inválida' });    
        } else {
          req.body.decoded = decoded;    
          next();
        }
      });
    } else {
      res.json({ 
          err: 'Token no proveída.' 
      });
    }
}

module.exports=middleWareJsonToken