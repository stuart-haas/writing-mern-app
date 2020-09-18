const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        }
    })
    User.sync({ force: true }).then(function () {
        return User.create({
            firstName: 'John',
            lastName: 'Hancock'
        });
    })
}