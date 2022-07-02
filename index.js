const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to our node js app"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        }

        res.json({
            message: "post created... ",
            authData
        });
    });
    
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'John',
        email: 'John@gmail.com'
    };

    jwt.sign({ user: user }, "secretkey", (err, token) => {
        res.json({
            token
        });
    });

});

function verifyToken (req, res){
    const bearerHeader = req.headers['authorization']
    if (typeof bearerheader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}
void


app.listen(8800, (req, res) => {
    console.log("Server is live on port 8800")
})