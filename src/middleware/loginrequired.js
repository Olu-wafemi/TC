const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{
    const authHeader = req.get("Authorization")
  
    if(!authHeader){
      
        return res.status(401).json({status: false, message: 'Not Authenticated'})
    }
    const token = authHeader.split(' ')[1];
    let decodedToken
    try{
        decodedToken  = jwt.verify(token,process.env.SECRET_KEY)

    } catch (err){
        
    } 
    //if the token was not verified
    if (!decodedToken) {
        
        return res.status(401).json({status: false, message: 'Not Authenticated'})
    }
    
   req.user_id = decodedToken.user_id;
    next()
}