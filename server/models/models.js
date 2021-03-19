// Создание моделй для БД (postgres)
const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Модель Корзины
const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.INTEGER },
  total_price: { type: DataTypes.INTEGER },
  qty: { type: DataTypes.INTEGER },
  discount: { type: DataTypes.INTEGER },
  is_delete: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Модель Продукта
const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  qty: { type: DataTypes.INTEGER, defaultValue: 1 },
  discount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = {
  Basket,
  Product,
};
