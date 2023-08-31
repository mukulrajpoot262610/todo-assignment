const UserModel = require('../models/user-model')

class UserService {

    async findUser(filter) {
        const users = await UserModel.findOne(filter)
        return users
    }

    async createUser(data) {
        const user = await UserModel.create(data)
        return user
    }
}

module.exports = new UserService()