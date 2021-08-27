const status = require('http-status-codes');

const fieldValidDevice = async (req, res, next) => {
    const { name, cor, part_number } = req.body;

    if (!name || typeof name != "string" || name.length < 3 || name.length > 50) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo nome inválido!" });
    }

    if (!cor || typeof cor != 'string' || cor.length < 3 || cor.length > 16) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo cor inválido!" });
    }

    if (!part_number || typeof part_number != 'number' || part_number < 1) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo número da peça inválido!" });
    }

    next();
}

module.exports = {
    fieldValidDevice,
}
