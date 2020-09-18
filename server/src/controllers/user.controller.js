const { models } = require('./../models')

async function findOne(req, res) {
    const users = await models.user.findOne()
    res.status(200).json(users)
}

module.exports = {
    findOne
}