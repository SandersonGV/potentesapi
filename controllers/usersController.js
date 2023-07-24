const UserModel = require('../models/user');

// CRUD Controllers
class UsersController {
    getUsers = async (req, res, next) => {
        try {
            const users = await UserModel.findAll({order: [['id', 'ASC']]})
            res.status(200).json({ content: users });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getUser = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = UserModel.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json({ content: user });
        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    createUser = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            const result = await UserModel.create({
                name: name,
                email: email,
                password: password,
                ativo: true
            })
            res.status(201).json({
                message: 'User created successfully!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const { name, email, password } = req.body;

            const user = await UserModel.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            user.name = name;
            user.email = email;
            user.password = password;

            res.status(201).json({
                message: 'User created successfully!',
                user: result
            });
            const result = await user.save();
            res.status(200).json({
                message: 'User updated!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            const userId = req.params.userId;

            const user = await UserModel.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const result = await User.destroy({
                where: {
                    id: userId
                }
            });

            res.status(200).json({
                message: 'User deleted!',
                content: result
            });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = new UsersController()