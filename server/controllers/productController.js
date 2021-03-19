const { Product } = require("../models/models");

class ProductController {
  // Функция создания товара (Используется программа Postman для удобства проверки
  // запросов с клиента на сервер и получения ответо в со стороны backend)
  async create(req, res) {
    const { name, price, qty, discount } = req.body;
    const product = await Product.create({ name, price, qty, discount });
    return res.json(product);
  }

  // Получение всех товаров
  async getAll(req, res) {
    let products;
    const { listId } = req.body;
    // Получение одного товара если указан ID
    if (listId) {
      products = await Product.findAll({
        where: { id: listId },
      });
    } else products = await Product.findAll();
    return res.json(products);
  }
}

module.exports = new ProductController();
