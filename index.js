import express from 'express';
import dotenv from 'dotenv';
import user from './routes/user.js'
import blogs from './routes/blogs.js'

dotenv.config();
const port = process.env.PORT;
const app = express();

// Route to get  users
app.use('/api/users', user);
app.use('/api/blog', blogs);


// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Not Found' });
    next();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});