const mongoose=require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://hikansh:hikansh1998@ds137483.mlab.com:37483/polling_app',{useNewUrlParser:true})
    .then(()=>console.log('MongoDB connected')
    ).catch(err=>console.log(err)
    )