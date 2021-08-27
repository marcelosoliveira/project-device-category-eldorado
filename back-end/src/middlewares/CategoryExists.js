const status = require('http-status-codes');
const { findByCategory } = require('../services/CategoryService');

const categoryExists = async (req, res, next) => {
    const { name } = req.body;
    const category = await findByCategory(name);

    if (!category) return next();

    res.status(status.CONFLICT).send({ message: "Nome de categoria já existe!" });
}

module.exports = {
    categoryExists,
}