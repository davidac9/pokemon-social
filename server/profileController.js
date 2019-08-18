module.exports = {
    updatePic: async (req, res) => {
        const db = req.app.get('db')
        const {trainer_id, profile_pic} = req.body
        const newPic = db.update_profile_pic({profile_pic, trainer_id})
        return res.status(200).send(newPic)
    }
}