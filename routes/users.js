const express=require('express')
const router=express.Router();
const db=require('../config/database')
const User=require('../models/User')


//get user
router.get('/',(req,res)=>User.findAll().then(users=>{
  console.log(users)
  res.sendStatus(200) 
})
.catch(err=>console.log(err)));


//add user
router.get('/add',(req,res)=>{
  const data={
    name:"dex",
    email:"xyz@you.com",
    password:"dsfc123"
  }
  let {name,email,password}=data;
  User.create({
    name,
    email,
    password
  })
  .then(user=>res.redirect('/users'))
  .catch(err=>console.log(err))

})


module.exports=router;