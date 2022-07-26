const { Sequelize } = require('sequelize');
const conectar = new Sequelize(
  'd91ogh6omht38l',
  'yqwizxtxmtigxj',
  'e87c365ee3645610f0855c7bb5b6823ac67c9efe5c8de9f65200f343e29e2f58',
  {
    host: `ec2-3-228-236-221.compute-1.amazonaws.com`,
    dialect: 'postgres',

    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);
module.exports = conectar;
