import express from 'express';
import dotenv from 'dotenv';
import user from './routes/user.js'

dotenv.config();
const port = process.env.PORT;
const app = express();

// Route to get  users
app.use('/api/users', user);


// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});