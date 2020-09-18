const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE)

require('./user.model')(sequelize)

module.exports = sequelize