const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize/config/sequelize');

const Todo = sequelize.define(
    'todo',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        todo_json: {
            type: DataTypes.JSON, 
            allowNull: false
          },
          status:{
            type: DataTypes.ENUM('pending','completed'),
            allowNull: false,
            defaultValue: 'pending'
          },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        freezeTableName: true, 
        tableName: 'todo', 
    }
);

module.exports = Todo;
