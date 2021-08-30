const express = require('express');
const status = require('http-status-codes');

const { createCategory, listAllCategory, findByIdCategory, deleteCategory } = require('../controller/CategoryController');
const { fieldValidCategory, categoryExists, categoryNotFound } = require('../middlewares/CategoryExceptionHandler');

const router = express.Router();

router.get("/", listAllCategory);

router.get("/:id", categoryNotFound, findByIdCategory);

router.post("/create", fieldValidCategory, categoryExists, createCategory);

router.delete("/delete/:id", categoryNotFound, deleteCategory);

router.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).send( { error: `Error! ${err.message}` });
});

module.exports = router;