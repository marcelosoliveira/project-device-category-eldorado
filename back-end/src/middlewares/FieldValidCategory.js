const status = require('http-status-codes');

const fieldValidCategory = async (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name != "string" || name.length < 3 || name.length > 128) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo nome inválido!" });
    }

    next();
}

module.exports = {
    fieldValidCategory,
}