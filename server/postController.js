module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const posts = await db.search_posts(`%${req.query.title}%`)
    }
}