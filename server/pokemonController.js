module.exports = {
    addPokemon: async (req, res) => {
        const db = req.app.get('db')
        // const {trainer_id, pokemon_id}
        // console.log(req.body)
        const pokemonCount = await db.count_pokemon(req.body.trainer_id)
        const pokemon = await db.insert_pokemon(req.body)
        // console.log(pokemonCount[0].count)
        if(pokemonCount[0].count === 0) {
            const {trainer_id, pokemon_id} = pokemon[0]
            db.insert_favorite({trainer_id, pokemon_id})
        }
        // console.log(pokemon)
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
    },
    chooseFavorite: async (req,res) => {
        const {trainer_id, pokemon_id} = req.body
        const db = req.app.get('db')
        const favorite = await db.insert_favorite({trainer_id, pokemon_id})
        return res.status(200).send(favorite)
    },
    getFavorite: async (req, res) => {
        const db = req.app.get('db')
        const favorite = await db.select_favorite(req.query.trainer_id)
        return res.status(200).send(favorite)
    },
    releasePokemon: async (req, res) => {
        const db = req.app.get('db')
        const {trainer_id, pokemon_id} = req.query
        const checkFavorite = await db.find_favorite([pokemon_id])
        if (checkFavorite.length > 0) {
            return res.status(400).send({message: `you can't delete your favorite pokemon!`})
        }
        const deletedPokemon = await db.delete_pokemon({trainer_id, pokemon_id})
        return res.status(200).send(deletedPokemon)
    },
    renamePokemon: async(req, res) => {
        const db = req.app.get('db')
        const {pokemon_id} = req.query
        const {nick_name} = req.body
        const nick = db.update_nick_name({nick_name, pokemon_id})
        return res.status(200).send(nick)
    }
}