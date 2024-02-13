const express = require('express')
var bodyParser = require('body-parser')
const routes=require('../routers');
const app = express()
const port = 3000
const collection= require("./mongodb") 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use('',routes); 
app.set('view engine', 'hbs');
app.set('views', 'views')
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/',(req,res)=>{
  res.render("demo")
})

app.get('/login',(req,res)=>{
  res.render("login")
})

app.get('/signup',(req,res)=>{
  res.render("signup")
})

app.post("/signup",async(req,res)=>{
const data={ 
  name:req.body.name,
  password:req.body.password
}
await collection.insertMany([data])
res.render("demo")
})


app.post("/login",async(req,res)=>{ 
  try{
      const check = await collection.findOne({name:req.body.name})

      if(check.password===req.body.password){
          res.render("demo")
      }
      else{
          res.send("wrong password")
      }
  } 
  catch{
      res.send("wrong details")
  }  
  })