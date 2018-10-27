const express=require('express');
const router=express.Router();
const Pusher=require('pusher');
const mongoose=require('mongoose');
const Vote=require('../models/Vote')

var pusher = new Pusher({
    appId: '626703',
    key: '78671611f2da4f3fd5b5',
    secret: 'bc154c8044ba58637742',
    cluster: 'ap2',
    encrypted: true
  });


router.get('/',(req,res)=>{
    Vote.find().then(votes => res.json({success:true , votes:votes}));
})

router.post('/',(req,res)=>{

    const newVote={
        os:req.body.os,
        points:1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points:parseInt(vote.points),
            os:vote.os
          });
          return res.json({success:true,message:'ThankYou for voting..!!'})
    })    
    })


module.exports=router;