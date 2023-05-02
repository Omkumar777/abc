const Sequelize = require('sequelize')
require('dotenv').config();
// const users = require('./users')


const sequelize = new Sequelize(process.env.database,process.env.user,process.env.password,{
    host:'localhost',
    dialect: 'mysql',
    operatorsAliases : false,
    pool:{
        max:10,
        min:0,
        idle:10000
    },
    logging : false,
});

const db ={}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users" )(sequelize, Sequelize);
db.orders = require("./orders")(sequelize, Sequelize);
db.products = require("./products")(sequelize, Sequelize);

db.users.hasMany(db.orders,{
    foreignKey : 'userId'
})
db.products.hasMany(db.orders,{
    foreignKey :'productId'
})
module.exports = db;