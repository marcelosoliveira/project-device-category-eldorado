const status = require('http-status-codes');
const categoryService = require('../services/CategoryService');

const fieldValidCategory = async (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name != "string" || name.length < 3 || name.length > 128) {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid field name!" });
    }

    next();
}

const categoryNotFound = async (req, res, next) => {
    const { id } = req.params;

    const category = await categoryService.findById(id);

    if (!category) return res.status(status.NOT_FOUND).send({ message: `Category not found! ID: ${id}!` });

    next();
}

const categoryExists = async (req, res, next) => {
    const { name } = req.body;
    const category = await categoryService.findByCategory(name);

    if (!category) return next();

    res.status(status.CONFLICT).send({ message: "Category name already exists!" });
}

module.exports = {
    fieldValidCategory,
    categoryNotFound,
    categoryExists,
}