const { Op } = require('sequelize');
const Todo = require('../../sequelize/models/todo')
const message = require("../../sequelize/config/message.json");

exports.addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = await Todo.create({
            todo_json: {
                title,
                description
            }
        });

        return res.status(201).send({
            status: true,
            message: message.TODO.CREATED,
            data: todo
        });

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: message.ERRORS.GENERAL,
            error: error.message
        });
    }
};

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: { isDeleted: false },
            attributes: ['id', 'todo_json', 'status', 'isDeleted', 'createdAt', 'updatedAt']
        });
        const formattedTodos = todos.map(todo => ({
            id: todo.id,
            todo_json: JSON.parse(todo.todo_json),
            status: todo.status,
            isDeleted: todo.isDeleted,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        }));

        return res.status(200).send({
            status: true,
            message: message.TODO.TODO_FETCHED,
            data: formattedTodos
        });

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: message.ERRORS.GENERAL,
            error: error.message
        });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).send({
                status: false,
                message: "Status is required",
            });
        }

        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).send({
                status: false,
                message: message.TODO.TODO_NOT_FOUND,
            });
        }

        await todo.update({ status });

        return res.status(200).send({
            status: true,
            message: message.TODO.TODO_UPDATE,
            data: todo
        });

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: message.ERRORS.GENERAL,
            error: error.message
        });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).send({
                status: false,
                message: message.TODO.TODO_NOT_FOUND,
            });
        }
        await todo.update({ isDeleted: true });
        return res.status(200).send({
            status: true,
            message: message.TODO.TODO_DELETED,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: message.ERRORS.GENERAL,
            error: error
        });
    }
};
