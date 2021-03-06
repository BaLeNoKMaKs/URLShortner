const { Router } = require("express");
const Link = require("../models/Link");
const config = require("config");
const shortid = require("shortid");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();
    const existing = await Link.findOne({ code });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;
    const link = new Link({ code, to, from, owner: req.user.userId });

    await link.save();
    res.status(201).json({ link });
  } catch {
    res
      .status(500)
      .json({ message: "Произошла какая-то ошибка, попробуйте снова!" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch {
    res
      .status(500)
      .json({ message: "Произошла какая-то ошибка, попробуйте снова!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch {
    res
      .status(500)
      .json({ message: "Произошла какая-то ошибка, попробуйте снова!" });
  }
});

module.exports = router;
