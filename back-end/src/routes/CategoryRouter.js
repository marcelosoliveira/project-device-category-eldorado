const express = require('express');
const status = require('http-status-codes');

const { createCategory, listAllCategory } = require('../controller/CategoryController');

const router = express.Router();

router.get("/", listAllCategory);

router.post("/", createCategory);

router.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).send( { error: `Error! ${err.message}` });
});

module.exports = router;