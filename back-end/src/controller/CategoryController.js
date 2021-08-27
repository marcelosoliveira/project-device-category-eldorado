const status = require('http-status-codes');
const categoryService = require('../services/CategoryService');

const listAllCategory = async () => {
    try {
        const category = await categoryService.listAllCategory();
        res.status(status.OK).send(category);        
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await categoryService.createCategory(name);
        res.status(status.CREATED).send({ message: "Categoria criada com sucesso!" });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

module.exports = {
    listAllCategory,
    createCategory,
}
