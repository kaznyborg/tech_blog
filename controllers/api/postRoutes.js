
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware

router.post('/create', withAuth, async (req, res) => {
    const body = req.body
    try {
      const post = await Post.create({ 
        title: req.body.title,
        body: req.body.body,  
        userid: req.session.userid, 
      }); 
      res.status(200).json({ message: "Posted"})
    } 
    catch (err) {
      res.status(500).json(err); 
    }
  }); 

// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware

router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatePost = await Post.update({ body: req.body,},
        {
        where: {
          id: req.params.id
        }
      });
      if(!updatePost) {
        res.status(404).json({
          message: 'No post found with this id'  + req.params.id});
          return; 
        }
      res.status(200).json(updatePost); 
        } catch (err) {
          res.status(500).json(err);
        }
    }); 

    router.get("/:id", withAuth, async (req, res) => {
      try {
        const singlePost = await Post.findOne({
          where: { id: req.params.id },
          attributes: ["id", "body", "title", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
            {
              model: Comment,
              order: [["createdAt", "DESC"]],
              attributes: ["body"],
            },
          ],
        });
        console.log(singlePost, 'SINGLE POST')
        const post = singlePost;
        res.render("single-post", {
          posts: post,
          id: req.params.id,
          body: req.body,
        });
      } catch (err) {
        res.status(500).send(err);
      }
    });

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware

router.delete('/:id', withAuth, async (req, res) => {
    // delete a category by its `id` value
    try {
    const deletePost = await Post.destroy ({
      where: {
      id: req.params.id
    }
    });
  
      if (!deletePost) {
        res.status(404).json({
          message: 'No post found with this id' });
          return;
      }
  
      res.status(200).json(deletePost);
    } catch (err) {
      res.status(500).json(err);
    }
  
  }); 

module.exports = router;
