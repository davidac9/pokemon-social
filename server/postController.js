module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const posts = await db.select_posts(`%${req.query.username}%`)
        return res.status(200).send(posts)
    }
}