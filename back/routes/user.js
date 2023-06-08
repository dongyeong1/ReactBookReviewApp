const express=require('express');
const { User,Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');



const router = express.Router();

router.get('/',(req,res)=>{
    res.send('asd')
})



router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {//passport.authenticate가 실행됨녀 전략(local)이실행됨   (err,user,info)는전략 local의 done에서 온다
      if (err) {//서버에러
        console.error(err);
        return next(err);
      }
      if (info) {//클라이언트에러
        console.log('클라',info)
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {//req.login실행될때 passport->index의 serializeUser실행됨
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password']
          },
          include: [{
            model: Post,
            attributes: ['id'],
          }, {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          }, {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          }]
        })
        return res.status(200).json(fullUserWithoutPassword);
      });
    })(req, res, next);
  });


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