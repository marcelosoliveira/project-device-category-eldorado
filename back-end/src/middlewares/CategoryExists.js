const status = require('http-status-codes');
const { findByCategory } = require('../services/CategoryService');

const categoryExists = (req, res, next) => {
    const { name } = req.body;
    const category = findByCategory(name);

    if (!category) next();

    res.status(status.CONFLICT).send({ message: "Nome de categoria já existe!" });
}

module.exports = {
    categoryExists,
}