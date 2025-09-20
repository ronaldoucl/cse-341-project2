const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swager.tags=['Users']
    res.send("Hello World");
});

router.use("/books", require("./books"));

module.exports = router;