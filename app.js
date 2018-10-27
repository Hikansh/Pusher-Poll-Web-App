const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();

const poll=require('./routes/poll');
require('./config/DB');

//Set public folder
app.use(express.static(path.join(__dirname,'public')));

//middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Enable cors
app.use(cors());

app.use('/poll',poll);

const portNo=3000;
app.listen(portNo,()=>{
    console.log(`Server started on port ${portNo}`);
})