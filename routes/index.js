const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swager.tags=['Users']
    res.send("Hello World! Welcome to PROJECT #2");
});

router.use("/books", require("./books"));

module.exports = router;