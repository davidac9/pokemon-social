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
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const user = await db.find_username([username])
        if (user.length === 0) {
            return res.status(400).send({message: 'Username not found'})
        }
        const result = bcrypt.compareSync(password, user[0].hash)
        if (result) {
            req.session.user = user[0]
            return res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
        } else {
            return res.status(400).send({message: 'incorrect password'})
        }
    },
    authMe: async (req, res) => {
        return res.status(200).send({message: 'component happened', user: req.session.user, loggedIn: true})
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false})
    }
}