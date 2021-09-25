const status = require('http-status-codes');
const deviceService = require('../services/DeviceService');
const categoryService = require('../services/CategoryService');

const fieldValidDevice = async (req, res, next) => {
    const { name, color, part_number, id_category } = req.body;

    if (!name || typeof name != "string" || name.length < 3 || name.length > 100) {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid field name!" });
    }

    if (!color || typeof color != 'string' || color.length < 3 || color.length > 16) {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid color field!" });
    }

    if (!part_number || typeof part_number != 'number' || part_number < 1) {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid part number field!" });
    }

    if (!id_category || typeof id_category != 'number') {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid category identification field!" });
    }

    const device = await deviceService.findByDevice(part_number);

    if (device) return res.status(status.CONFLICT).send({ message: "Device part number already exists!" });

    const category = await categoryService.findById(id_category);

    if (!category) return res.status(status.NOT_FOUND).send({ message: `Category not found ID: ${id_category}!` });

    next();
}

const updateValidDevice = async (req, res, next) => {
    const { name, color, part_number, id_category } = req.body;

    if (!name || typeof name != "string" || name.length < 3 || name.length > 100) {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid field name!" });
    }

    if (!color || typeof color != 'string' || color.length < 3 || color.length > 16) {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid color field!" });
    }

    if (!part_number || typeof part_number != 'number' || part_number < 1) {
        return res.status(status.BAD_REQUEST).send({ message: "Invalid part number field!" });
    }
    
    const category = await categoryService.findById(id_category);

    if (!category) return res.status(status.NOT_FOUND).send({ message: `Category not found ID: ${id_category}!` });

    next();
}

const deviceNotFound = async (req, res, next) => {
    const { id } = req.params;

    const device = await deviceService.findById(id);

    if (!device) return res.status(status.NOT_FOUND).send({ message: `Device not found! ID: ${id}` });

    next();
}

module.exports = {
    fieldValidDevice,
    updateValidDevice,
    deviceNotFound,
}
