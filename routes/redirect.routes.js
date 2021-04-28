const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;
      link.save();
      return res.redirect(link.from);
    }

    res.status(404).json({ message: "Ссылка не найдена" });
  } catch {
    res
      .status(500)
      .json({ message: "Произошла какая-то ошибка, попробуйте снова!" });
  }
});

module.exports = router;
