import express from 'express';
import models from '../sequelize.js';

const { Blog } = models
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/index', async (req, res) => {
    try {
        const users = await Blog.findAll();
        res.status(200).json({ success: true, data: Blog.map(blog => blog.dataValues) });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});