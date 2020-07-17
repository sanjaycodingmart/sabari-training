function checkRole(req,res,next) 
{
  if(req.session.role==='admin')
  {
    next();
  }
  else{
    req.flash('error','Sign in as admin to continue')
    res.redirect('/');
  }
  
}

module.exports={
  checkRole
}