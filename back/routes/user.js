const express=require('express');
const { User,Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');



const router = express.Router();




router.get('/',async(req,res,next)=>{
    try{
        if(req.user){
            const user = await User.findOne({
                where:{id:req.user.id}
            })
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                  exclude: ['password']
                },
                include: [{
                  model: Post,
                  include:[{
                      model:User,
                      as:'Likers',
                      attributes:['id']
                  }]
                }, {
                  model: User,
                  as: 'Followings',
                  attributes: ['id'],
                }, {
                  model: User,
                  as: 'Followers',
                  attributes: ['id'],
                },{
                    model:Post,
                    as:'Liked',
                    attributes:['id']
                }]
              })
            res.status(200).json(fullUserWithoutPassword)
        }else{
            res.status(200).json(null)
        }
    }catch(err){
        console.log(err)
        next(err)
    }
})


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {//passport.authenticate가 실행됨녀 전략(local)이실행됨   (err,user,info)는전략 local의 done에서 온다
      if (err) {//서버에러
        console.error(err);
        return next(err);
      }
      if (info) {//클라이언트에러
        console.log(info)
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
            include:[{
                model:User,
                as:'Likers',
                attributes:['id']
            }]
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


  router.post("/logout", async (req, res, next) => {
	req.logout((err) => {
		req.session.destroy();

		if (err) {
			res.redirect("/");
		} else {
            res.clearCookie('connect.sid');
			res.status(200).send("server ok: 로그아웃 완료");
		}
	});
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


router.patch('/:userId/follow',async(req,res,next)=>{
    try{

        const user=await User.findOne({where:{id:req.params.userId}})
        if(!user){
            res.status(403).send('없는사람입니다')
        }

        await user.addFollowers(req.user.id)

     
        res.status(200).json({UserId:parseInt(req.params.userId,10)})
    }catch(err){
        console.log(err)
    }
})




router.delete('/:userId/follow',async(req,res,next)=>{
    try{
        const user=await User.findOne({where:{id:req.params.userId}})
        if(!user){
            res.status(403).send('없는사람입니다')
        }

        await user.removeFollowers(req.user.id)
        //user는 내가 팔로우하고있는사람
        //그 user의 팔로워는 나니까 removeFollowers한다

     
        res.status(200).json({UserId:parseInt(req.params.userId,10)})
    }catch(err){
        console.log(err)
    }
})

module.exports=router