const User=require('../models/User')

function adminDb() {

const data=[]

User.findAll({
  where: {
      email: 'sa2@'  
  },
  attributes: ['id', 'name','email','password','role'], 
}).then((persons)=>{
  try{
    data.push(persons)
    console.log('admin data fethed'+persons[0].dataValues)
    return data
  }catch(err)
  {
    console.log("no such user found in db so admin cant access it")
    return null
  }
})


}

module.exports=adminDb;