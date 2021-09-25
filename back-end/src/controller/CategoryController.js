const status = require('http-status-codes');
const categoryService = require('../services/CategoryService');

const listAllCategory = async (_req, res) => {
    try {
        const category = await categoryService.listAllCategory();
        res.status(status.OK).send(category);        
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

const findByIdCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.findById(id);
        res.status(status.OK).send(category);        
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await categoryService.createCategory(name);
        res.status(status.CREATED).send({ message: "Category created successfully." });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await categoryService.updateCategory(id, name);
        res.status(status.OK).send({ message: `Category update successfully. ID: ${id}` });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }    
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        res.status(status.OK).send({ message: `Category successfully deleted Id: ${id}.`});
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

module.exports = {
    listAllCategory,
    findByIdCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}
