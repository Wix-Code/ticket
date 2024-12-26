import jwt from "jsonwebtoken"

export const verify = (req,res,next) => {
  const token = req.cookies.accessToken;
  if(!token){
    return res.status(401).send({success: false, message: "Unauthorised"})
  }

  jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
    if(err){
      return res.status(403).send({sucess: false, message: " invalid token"})
    }
    req.user = user;
    next();
  })
}