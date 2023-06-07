const express=require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');



const router = express.Router();

router.get('/',(req,res)=>{
    res.send('asd')
})

router.post('/signup',async(req,res)=>{
    try{

        
        const aUser=await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(aUser){
            return res.status(403).send('이미 사용중인 아이디입니다.')
        }
        const hashedpassword= await bcrypt.hash(req.body.password,12)
        await User.create({
            email:req.body.email,
            nickname:req.body.nickname,
            password:hashedpassword
        })
        res.status(200).send('ok')
    }catch(err){
        console.log(err)
    }
})

module.exports=router