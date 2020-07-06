const User=require('../models/User')
const inputData=[]
const dbData=[]

function storeData(req,res,next) 
{
  fetch(req,res,next)
  function fetch(callback){
    const data={
      email:req.body.email,
      password:req.body.password
    }
    inputData.push(data)
    User.findAll({
        where: {
            email: req.body.email 
        },
        attributes: ['id', 'name','email','password','role'], 
    })
    .then((persons)=>{
      try{
        dbData.push(persons[0].dataValues)
      }catch(err)
      {
        console.log("no such user found")
      }
    })
    callback(req,res,next)
    
  }
  
}





const callback=(res,req)=>{
  console.log(dbData)
  console.log(inputData)
  if(dbData.length===0)
  {
    inputData.pop();
    console.log("no user")
    req.flash('error','No such user')
    res.redirect('/login')
  }
  try{
    if(await bcrypt.compare(inputData[0].password,dbData[0].password)){
      inputData.pop();
      console.log("correct password")
      req.session.userID=dbData[0].id;
      req.session.role=dbData[0].role;
      dbData.pop();
      res.redirect('/')
    }else{
      dbData.pop();
      inputData.pop();
      console.log("wrong password")
      req.flash('error','wrong password')
      res.redirect('/login')
    }
  }catch(e){
    return (e)
  }
}



module.exports={storeData}