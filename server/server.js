require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./authController')
const postCtrl = require('./postController')

const app = express()

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))

app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.get('/api/auth/me', authCtrl.authMe)
app.post('/api/auth/logout', authCtrl.logout)

app.get('/api/posts', postCtrl.getPosts )

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`at least ${SERVER_PORT} or more to see!`))
})
