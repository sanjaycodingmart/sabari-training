const jwt = require("jsonwebtoken")

const checkApproved=async (req,res,next)=>{

  const token=req.cookies['AccessToken']
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,response)=>{
      if(err)
      {
        const refreshToken=req.cookies['RefreshToken']
        if(refreshToken==undefined)
        {
          console.log("No acces and refresh token available"+token+" "+refreshToken)
          return res.redirect('/login')  
        }else
        {
          jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,response)=>{
            if(err){
              console.log("invalid refresh token")
              return res.redirect('/login')
            }else{

              const user={
                name:req.body.name,
               
              }

              const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
              res.cookie('AccessToken', accessToken, { maxAge: 8000});
              console.log('new token generated and verified after cycle')
              return next()
            }
          })

        }
      }
      else
      {
        console.log('token verified')
        return next()
      }
    })
  
}

module.exports=checkApproved