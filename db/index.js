const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', '', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    // logging: false
});


sequelize.authenticate().then(() => {
    console.log('Connected');
}).catch((err) => {
    console.log(err);
})


const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize
//require models
db.user = require('../models/user.js')(sequelize, DataTypes)
db.product = require('../models/products.js')(sequelize, DataTypes)
// db.books = require('../models/books')(sequelize, DataTypes)
// db.userbook = require('../models/userbook')(sequelize, DataTypes)
db.cart = require('../models/carts.js')(sequelize, DataTypes)

//Many to many relation between user and book

db.user.belongsToMany(db.product, { through: db.cart, foreignKey: 'UserId' });
db.product.belongsToMany(db.user, { through: db.cart, foreignKey: 'ProductId' });

// to rebuilt tables
// {force:true}
sequelize.sync()
    .then(() => {

    })
    .catch((error) => {
        console.log("there is an error while synching", error);
    })


module.exports = db;
