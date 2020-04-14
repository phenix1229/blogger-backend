const express = require('express');
const router = express.Router();
const Blog = require('./models/Blog');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getAll', (req, res) => {
  Blog.find({})
  .then((blogs) => {
    return res.status(200).json(blogs);
})
.catch(err => res.status(500).json({message: 'Server error', err}));
});

router.get('/getOne/:id', (req, res) => {
  Blog.findOne({_id:req.params.id})
  .then((blog) => {
      if(blog){
        return res.status(200).json({blog});
      } else {
          res.status(400).json({message:'Cannot find blog'});
      }
  })
  .catch(err => res.status(500).json({message:'Server error', err}));
});

router.post('/addBlog', (req, res) => {
      const newBlog = new Blog();
      newBlog.title = req.body.title 
      newBlog.author = req.body.author
      newBlog.subject = req.body.subject
      newBlog.article = req.body.article
      newBlog.save()
      .then((blog) => {
          return res.status(200).json({message: 'Blog added', blog: blog});
      })
      .catch(err => {
          return res.status(500).json({message: 'Blog was not created', err});
      })
});

router.put('/update/:id', (req, res) => {
  return new Promise((resolve, reject) => {
      Blog.findById( {_id: req.params.id})
      .then((blog) => {
          const {title, author, subject, article} = req.body;
          blog.title = title ? title : blog.title;
          blog.author = author ? author : blog.author;
          blog.subject = subject ? subject : blog.subject;
          blog.article = article ? article : blog.article;

          blog.save()
          .then(user => {
              return res.status(200).json({message:'Blog updated', user});
          })
          .catch(err => reject(err));
      })
      .catch(err => res.status(500).json({message:'Server error', err}));
  })
});

router.delete('/delete/:id', (req, res) => {
  return new Promise((resolve, reject) => {
      Blog.findByIdAndDelete({_id:req.params.id})
      .then(blog => {
          return res .status(200).json({message:'Blog deleted', blog});
      })
      .catch(err => res.status(400).json({message:'No blog to delete'}, err));
  })
  .catch(error => {
      return res.status(500).json({message:'Server error'});
  })
});

module.exports = router;