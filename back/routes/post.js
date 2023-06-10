const express=require('express');
const { Post ,Comment, User} = require('../models');


const router = express.Router();

router.post('/addcomment',async(req,res)=>{
    try{

        const post = await Post.findOne({
            where:{id:req.body.postId}
        })
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다')
        }
        const comment=await Comment.create({
            content:req.body.comment,
            UserId:req.user.id,
            PostId:req.body.postId
        })
        const fullComment=await Comment.findOne({
            where:{id:comment.id},
            include:[{
                model: User,
                attributes: ['id', 'nickname'],
              }]
        })
        res.status(201).json(fullComment)
    }catch(err){
        console.log(err)
    }
})

router.post('/addpost',async(req,res)=>{
  try{
   
    const post=await Post.create({
        title:req.body.title,
        content:req.body.text,
        rate:req.body.rate,
        UserId:req.user.id,
        bookname:req.body.bookname,
        isbn:req.body.isbn,
        src:req.body.image
    })

    const fullpost=await Post.findOne({
        where:{id:post.id},
        include:[{
            model: Comment,
    include: [{
      model: User,//댓글작성자
      attributes: ['id', 'nickname'],
    }],
        },{
            model:User,//게시글작성자
            attributes: ['id', 'nickname'],
        },{
            model:User,
            as:'Likers',
            attributes:['id']
        }
    ]
    })
    res.status(201).json(fullpost)
  }catch(err){
    console.log(err)
  }
    
})

router.post('/bookPosts',async(req,res)=>{
    const posts= await Post.findAll({
        where:{isbn:req.body.isbn},
        order:[
            ['createdAt','DESC'],
            [Comment, 'createdAt', 'DESC']
        ],
        include:[{
            model: Comment,
    include: [{
      model: User,//댓글작성자
      attributes: ['id', 'nickname'],
    }],
        },{
            model:User,//게시글작성자
            attributes: ['id', 'nickname'],
        },{
            model:User,
            as:'Likers',
            attributes:['id']
        }
    ]
    })
    res.status(201).json(posts)
})

router.post('/loadPost',async(req,res)=>{
    try{
        const post= await Post.findOne({
            where:{id:req.body.postId},
            include:[{
                model: Comment,
        include: [{
          model: User,//댓글작성자
          attributes: ['id', 'nickname'],
        }],
            },{
                model:User,//게시글작성자
                attributes: ['id', 'nickname'],
            },{
                model:User,
                as:'Likers',
                attributes:['id']
            }
        ]
        })
        res.status(201).json(post)

    }catch(err){
console.log('eeeeee',err)
    }

})

router.patch('/:postId/like', async (req, res, next) => { // PATCH /post/1/like
    try {
      const post = await Post.findOne({ where: { id: req.params.postId }});
      if (!post) {
        return res.status(403).send('게시글이 존재하지 않습니다.');
      }
      await post.addLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  router.delete('/:postId/like', async (req, res, next) => { // DELETE /post/1/like
    try {
      const post = await Post.findOne({ where: { id: req.params.postId }});
      if (!post) {
        return res.status(403).send('게시글이 존재하지 않습니다.');
      }
      await post.removeLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });


module.exports=router