if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
}

const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const session=require('express-session')
const db=require('./config/database');       
const User=require('./models/User')
const flash=require('express-flash')
const checkApproved=require('./middleware/checkApproved')


const SESSION_NAME="sid"
const age=1000*60*60*2
const inputData=[]
const dbData=[]


app.use('/public', express.static('public'));
app.use(flash())
app.use(session({
  name:SESSION_NAME,
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:age,
    sameSite:true
  }
}))
app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))


app.get('/',checkApproved,(req,res)=>{
  res.render('index.ejs');
})
app.get('/login',(req,res)=>{
  res.render('login.ejs');
})
app.post('/login',storeData,(req,res)=>{

 setTimeout(()=>{
  checkUserData(res,req)
 },1000)

})
app.post('/logout',(req,res)=>{
  req.session.userID=null;
  res.redirect('/login');
  
})
app.get('/register',(req,res)=>{
  res.render('register.ejs');
})
app.post("/register", async(req,res)=>{
try{
  const hashedPassword=await bcrypt.hash(req.body.password,10)
  let {name,email,password}=req.body;
  User.create({     
    id:Date.now().toString(),
    name,
    email,
    password:hashedPassword
  })
  .catch(err=>console.log(err))
  res.redirect('/login') 
}
catch
{
  res.redirect('/register')
}

})





const checkUserData=async(res,req)=>{
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




db.authenticate().then(()=>{console.log('database connected...')}).catch(err=>console.log(err))




function storeData(req,res,next) 
{
  const data={
    email:req.body.email,
    password:req.body.password
  }
  inputData.push(data)
  User.findAll({
      where: {
          email: req.body.email 
      },
      attributes: ['id', 'name','email','password'], 
  })
  .then((persons)=>{
    try{
      dbData.push(persons[0].dataValues)
    }catch(err)
    {
      console.log("no such user found")
    }
  })
  console.log(req.session.userID);
  return next()
}







const PORT=process.env.PORT || 3000
app.listen(3000,()=>{
  console.log(`server up and running on port ${PORT}`)
})