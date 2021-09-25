const categoryModel = require('../model/Category');

const listAllCategory = async () => {
    const category = await categoryModel.listAllCategory();

    return category;
}

const findByCategory = async (name) => {
    const category = await categoryModel.findByCategory(name);

    return category;
}

const findById = async (id) => {
    const category = await categoryModel.findById(id);

    return category;
}

const createCategory = async (name) => {
    await categoryModel.createCategory(name);
}

const updateCategory = async (id, name) => {
    await categoryModel.updateCategory(id, name);
}

const deleteCategory  = async (id) => {
    await categoryModel.deleteCategory(id);
}

module.exports = {
    listAllCategory,
    findByCategory,
    findById,
    createCategory,
    updateCategory,
    deleteCategory,
}
