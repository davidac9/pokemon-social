require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require('./authController')
const postCtrl = require('./postController')
const pokemonCtrl = require('./pokemonController')
const profileCtrl = require('./profileController')
const stripeCtrl = require('./stripeController')
const path = require('path');

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

app.use( express.static( `${__dirname}/../build` ) );

// endpoints for auth
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.get('/api/auth/me', authCtrl.authMe)
app.post('/api/auth/logout', authCtrl.logout)

// change a user's profile pic
app.put(`/api/profile-pics`, profileCtrl.updatePic)

// endpoints for posts
app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.addPost)

// pokemon endpoints
app.post('/api/pokemon', pokemonCtrl.addPokemon) // add a pokemon to a user's profile
app.get('/api/pokemon', pokemonCtrl.getTrainerPokemon) // get all of a user's pokemon
app.get('/api/trainers', pokemonCtrl.getProfilePic) // gets a user's profile pic to display on the page
app.delete('/api/pokemon', pokemonCtrl.releasePokemon) // deletes pokemon from a user's inventory
app.put('/api/pokemon', pokemonCtrl.renamePokemon) // back end stuff works. go make that axios stuff work

// favorite pokemon endpoints
app.post('/api/favorite/pokemon', pokemonCtrl.chooseFavorite) // this sets the user's first pokemon as their favorite
app.get('/api/favorite/pokemon', pokemonCtrl.getFavorite) // displays a user's favorite pokemon
app.put(`/api/favorite/pokemon`, pokemonCtrl.updateFavorite) // lets the user change their favorite pokemon

// stripe stuff
app.post('/api/payment', stripeCtrl.pay)

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`at least ${SERVER_PORT} or more to see!`))
})
