if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
}


const methodOverride=require('method-override')
const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const passport=require('passport')
const flash=require('express-flash')
const session=require('express-session')

const db=require('./config/database');       ////acquiring databse
const router=express.Router();
const User=require('./models/User')








app.use('/public', express.static('public'));








const initializePassport=require('./passport-config')
initializePassport(
  passport,
  email=>users.find(user=>user.email===email),
  id=>users.find(user=>user.id===id)
)

const users=[]

app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))
app.use(methodOverride('_method'))

app.use(passport.initialize())
app.use(passport.session())

app.get('/',checkAuthenticated,(req,res)=>{
  res.render('index.ejs',{name:req.user.name});
})

app.get('/login',checkNotAuthenticated,(req,res)=>{
  res.render('login.ejs');
})


app.post('/login',checkNotAuthenticated,async(req,res)=>{
  User.findAll({
    where: {
        email: req.body.email //array
    },
    attributes: ['id', 'name','password'], //object
})
.then((users)=>{
  console.log(users[0].dataValues);
})
}, passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true,

}))



app.get('/register',checkNotAuthenticated,(req,res)=>{
  res.render('register.ejs');
})


app.post("/register",checkNotAuthenticated, async(req,res)=>{
try{
  const hashedPassword=await bcrypt.hash(req.body.password,10)
  users.push({
    id:Date.now().toString(),
    name: req.body.name,
    email:req.body.email,
    password:hashedPassword
  })
  let {name,email,password}=req.body;
  User.create({     //ENTERING DATA TO DB
    name,
    email,
    password
  })
  .catch(err=>console.log(err))
  res.redirect('/login') 
}
catch
{
  res.redirect('/register')
}

})


app.delete('/logout',(req,res)=>{
  req.logOut()
  res.redirect('/login')
})





function checkAuthenticated(req,res,next){
  if(req.isAuthenticated())
  {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
  if(req.isAuthenticated())
  {
    return res.redirect('/')
  }
  return next()
}


//working area
//checking db connection

db.authenticate().then(()=>{console.log('database connected...')}).catch(err=>console.log(err))

app.use('/users',require('./routes/users'))










const PORT=process.env.PORT || 3000
app.listen(3000,()=>{
  console.log(`server up and running on port ${PORT}`)
})