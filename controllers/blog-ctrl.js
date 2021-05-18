const Blog = require('../models/blog-model')

createPage = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide info',
        })
    }

    const blog = new Blog(body)

    if (!blog) {
        return res.status(400).json({ success: false, error: err })
    }

    blog
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: blog._id,
                message: 'Page Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}

updateBlog = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'not found!',
            })
        }

        blog.author = body.author
        blog.topic = body.topic
        blog.title = body.title
        blog.blogs = body.blogs

        blog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: blog._id,
                    message: 'Updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Not updated!',
                })
            })
    })
}

getBlogById = async (req, res) => {
    await Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!blog) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: blog })
    }).catch(err => console.log(err))
}

getPage = async (req, res) => {
    await Blog.find({}, (err, blogs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!blogs.length) {
            return res
                .status(404)
                .json({ success: false, error: `not found` })
        }
        return res.status(200).json({ success: true, data: blogs })
    }).catch(err => console.log(err))
}

module.exports ={
    createPage,
    updateBlog,
    getBlogById,
    getPage
}