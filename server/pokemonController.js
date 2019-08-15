const axios = require('axios')

module.exports = {
    addPokemon: async (req, res) => {
        const db = req.app.get('db')
        const pokemon = await db.insert_pokemon(req.body)
        return res.status(200).send(pokemon)
    },
    getTrainerPokemon: async (req, res) => {
        const db = req.app.get('db')
        const pokemon = await db.select_trainer_pokemon(req.query.username)
        return res.status(200).send(pokemon)
    },
    getProfilePic: async (req, res) => {
        const db = req.app.get('db')
        const profilePic = await db.select_profile_pic(req.query.username)
        return res.status(200).send(profilePic)
    }
}