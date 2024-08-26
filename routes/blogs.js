import express from 'express';
import models from '../sequelize.js';
const { Blog } = models
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Get all blogs
router.get('/index', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json({ success: true, data: blogs.map(blog => blog.dataValues) });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Blogs add
router.post('/add/:id', async (req, res) => {
    const { id: userId } = req.params;
    const { blogs = "My first blog" } = req.body;
    if (!blogs) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    try {
        await Blog.create({ userId, blogs });
        res.status(201).json({ success: true, data: { blogs } });
    } catch (error) {
        console.error('Error creating Blog:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


//  Get Blogs by user Id
router.get('/get/:id', async (req, res) => {
    const { id: userId } = req.params;
    if (!userId) {
        return res.status(400).json({ success: false, message: 'Missing User Id' });
    }
    try {
        const blogs = await Blog.findAll({ where: { userId } });
        res.status(200).json({ success: true, data: blogs.map(blog => blog.dataValues) });
    } catch (error) {
        console.error('Error getting blog:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router
