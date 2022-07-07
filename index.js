'use strict'
require('dotenv').config();

const express=require('express');
const app=express();
app.use(express.json());

const routes=require('./routes/routes')
app.use('/api',routes)

const mongoose=require('mongoose');
const router = require('./routes/routes');
const mongoString=process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database=mongoose.connection;


database.on('error',(error)=>{
    console.log(error)
})

database.once('connected',()=>{
    console.log('Database connected!')
})

/* app.get('/',function(req,res){
    res.header('Content-Type:text/plain');
    res.status(404).send('404 not found');
});
app.get('/contacts',function(req,res){
    res.status(200).json({status:"Success"});
})*/
app.listen(3000,function(err,result){
    if(err){
        console.log(err);return 0;
    }
    console.log('Server listening on http://localhost:3000');
}); 