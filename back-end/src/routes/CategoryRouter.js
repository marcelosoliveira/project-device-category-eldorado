const express = require('express');
const status = require('http-status-codes');

const { createCategory, listAllCategory, deleteCategory } = require('../controller/CategoryController');
const { categoryExists } = require('../middlewares/CategoryExists');
const { fieldValidCategory } = require('../middlewares/FieldValidCategory');

const router = express.Router();

router.get("/", listAllCategory);

router.post("/create", fieldValidCategory, categoryExists, createCategory);

router.delete("/delete/:id", deleteCategory);

router.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).send( { error: `Error! ${err.message}` });
});

module.exports = router;