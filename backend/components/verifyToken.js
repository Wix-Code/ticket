import jwt from "jsonwebtoken"

export const verify = (req,res,next) => {
  const token = req.cookies.accessToken;
  if(!token){
    return res.status(401).send({success: false, message: "Unauthorised"})
  }

  try {
    
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decode.id;
    next();

    console.log(req.user, "req user")
    console.log(decode, "decode user")
  
    } catch (error) {
      res.status(500).send({success: false, message: "Invalid token or details"})
    }
}