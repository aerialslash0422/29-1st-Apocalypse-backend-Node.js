const Sequelize = require('sequelize');

const User = require('./user');
const Category = require('./category')
const Product = require('./product');
const Cart = require('./cart')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Category = Category;
db.Product = Product;
db.Cart = Cart;

User.init(sequelize);
Category.init(sequelize);
Product.init(sequelize);
Cart.init(sequelize);

User.associate(db);
Category.associate(db);
Product.associate(db);
Cart.associate(db);

module.exports = db;
