import { Error } from 'sequelize/types';

const { DataTypes } = require('sequelize');
const connect = require('./connecton');
const tarefa = connect.define(
  'tarefa',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.STRING,

      allowNull: false,
    },
    realizada: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: true,
  }
);
tarefa
  .sync({ force: false })
  .then(() => {})
  .catch((err: Error) => {
    console.log(err);
  });
module.exports = tarefa;
