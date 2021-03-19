require("dotenv").config();
const express = require("express");
// Главный файл для работы сервера
const sequelize = require("./db");
const models = require("./models/models"); // Импорт моделей для БД
const cors = require("cors");
const router = require("./routes/index");

const PORT = process.env.PORT || 500; // Импорт конфигураций для сервера

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

// Функция запуска сервера
const start = async () => {
  try {
    // Подключение к нашей БД
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
