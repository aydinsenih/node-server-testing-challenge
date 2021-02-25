const router = require("express").Router();
const User = require("./user-model");

router.get("/", (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

router.post("/", (req, res) => {
    User.add(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});
router.delete("/:id", (req, res) => {
    User.remove(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

module.exports = router;
