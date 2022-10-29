const dotenv = require('dotenv');
const express = require('express');

dotenv.config({path:'./config.env'});
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(require('./router/route.js'));

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
});

app.get('/', (req,res) => {
    res.send('Hello from server');
});

app.get('/test', (req,res) => {
    res.status(200).json({message:"Hello From Server"});            
});
