const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = Router();

router.post(
  "/register",
  [
    check("email", "Введите корректный e-mail").isEmail(),
    check("password", "Введите корректный пароль").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors,
          message: "Введены некорректные данные при регистрации!",
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      return res.status(201).json({ message: "Пользователь успешно создан!" });
    } catch {
      res
        .status(500)
        .json({ message: "Произошла какая-то ошибка, попробуйте снова!" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Введите корректный e-mail").isEmail(),
    check("password", "Введите корректный пароль")
      .exists()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors,
          message: "Введены некорректные данные при авторизации!",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль!" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      return res.json({
        token,
        userId: user.id,
        message: "Вы вошли в аккаунт!",
      });
    } catch {
      res
        .status(500)
        .json({ message: "Произошла какая-то ошибка, попробуйте снова!" });
    }
  }
);
module.exports = router;
