


// NOTE :- in here this file data add , get , delete all the operation perform use postman must use postman



const express = require("express")
const dotenv = require('dotenv')
const { MongoClient, Collection } = require('mongodb');
const bodyparser = require('body-parser') // also print data through body parcer also in terminal
const cors = require('cors') // also for cors error 


dotenv.config();

// connection url 

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url)

const dbname = 'PassOp'

const app = express()

//console.log(process.env.MONGO_URI)  // you seet in terminal 

const port = 3000

app.use(bodyparser.json()) // also use bodyparser package 
app.use(cors()) // this handle cors error 


client.connect();

// get all the password

app.get('/', async(req,res)=>{
    
    const db = client.db(dbname) // make database 
    const Collection = db.collection('passwords')
    const findresult = await Collection.find({}).toArray();
    res.json(findresult) 
})

// save the password 

app.post('/', async(req,res)=>{
    
    const password = req.body
    //console.log(req.body)
    const db = client.db(dbname) // make database 
    const Collection = db.collection('passwords')
    const findresult = await Collection.insertOne(password);
    res.send({succsess:true , result:findresult})
})


// delete a password by id


app.delete('/', async(req,res)=>{  
    
    const password = req.body
    //console.log(req.body)
    const db = client.db(dbname) // make database 
    const Collection = db.collection('passwords')
    const findresult = await Collection.deleteOne(password);
    res.send({succsess:true , result:findresult})
})


app.listen(port , ()=>{

    console.log(`app listening on ${port}`)
})