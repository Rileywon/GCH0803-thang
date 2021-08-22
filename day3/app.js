const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/about',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.end('<h1 style="color:red">About Page</h1>')
})
const PORT = 5000;
app.listen(PORT);
console.log('server is running on Port: ', PORT)