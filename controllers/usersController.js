const {User} = require('../models/models');
const bcrypt = require("bcryptjs")

// CRUD Controllers
class UsersController {
    tryLogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ include:"cliente",where: { email: email } })
            if (!user) {
                return res.status(401).json({
                    message: "Login not successful",
                })
            }
            const hash = await bcrypt.compare(password, user.password)
            if(!hash){
                return res.status(401).json({
                    message: "Login not successful",
                })
            }
            
            return res.status(200).json({ content: user });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getUsers = async (req, res, next) => {
        try {
            const users = await User.findAll({include:"cliente", order: [['id', 'ASC']] })
            return res.status(200).json({ content: users });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    getUser = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = await User.findByPk(userId)
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
            const { nome, email, password, clienteId, tipo } = req.body;

            const hash = await bcrypt.hash(password, 10)
            let userObj = {
                nome: nome,
                email: email,
                password: hash,
                tipo: tipo,
                ativo: true
            }
            if(clienteId){
                userObj.clienteId = clienteId
            }

            const result = await User.create(userObj)
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

            const user = await User.findByPk(userId)
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

            const user = await User.findByPk(userId)
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