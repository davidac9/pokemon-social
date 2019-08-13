const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {username, password, profile_pic} = req.body
        const db = req.app.get('db')

        const checkName = await db.find_username([username])
        if (checkName.length > 0) {
            return res.status(400).send({message: 'Username in use'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.insert_user({username, hash, profile_pic})
        req.session.user = newUser[0]
        return res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
    },
    
}