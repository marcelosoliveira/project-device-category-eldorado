const express = require('express');
const status = require('http-status-codes');

const { createCategory, listAllCategory } = require('../controller/CategoryController');
const { categoryExists } = require('../middlewares/CategoryExists');

const router = express.Router();

router.get("/", listAllCategory);

router.post("/", categoryExists, createCategory);

router.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).send( { error: `Error! ${err.message}` });
});

module.exports = router;