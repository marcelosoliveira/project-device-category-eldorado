const categoryModel = require('../model/Category');

const listAllCategory = async () => {
    const category = await categoryModel.listAllCategory();

    return category;
}

const findByCategory = async (name) => {
    const category = await categoryModel.findByCategory(name);

    return category;
}

const createCategory = async (name) => {
    await categoryModel.createCategory(name);
}

const deleteCategory  = async (id) => {
    await categoryModel.deleteCategory(id);
}

module.exports = {
    listAllCategory,
    findByCategory,
    createCategory,
    deleteCategory,
}
