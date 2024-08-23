
import User from './models/User.js';
import http from 'node:http';
import dotenv from 'dotenv';


// PURE NODE JS CODE

dotenv.config();
const port = process.env.PORT

async function getUsers() {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function handleAddUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {

            const userData = JSON.parse(body);
            const { name, email } = userData;
            // Validate the data
            if (!name || !email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Missing required fields' }));
                return;
            }
            const user = await User.create({ name, email });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: user }));
        } catch (error) {
            console.error('Error adding user:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Internal Server Error' }));
        }
    });
}


const server = http.createServer(async (req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        try {
            const users = await getUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: users.map(user => user.dataValues) }));
        } catch (error) {
            console.error('Error fetching users:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Internal Server Error' }));
        }
    } else if (req.url === '/api/add/user' && req.method === 'POST') {
        await handleAddUser(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Not Found' }));
    }
});

server.listen(port)