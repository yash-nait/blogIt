const express = require('express')

const BlogCtrl = require('../controllers/blog-ctrl')

const router = express.Router()

router.post('/blog', BlogCtrl.createPage)
router.put('/blog/:id', BlogCtrl.updateBlog)
router.get('/blog/:id', BlogCtrl.getBlogById)
router.get('/pages', BlogCtrl.getPage)

module.exports = router