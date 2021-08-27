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

module.exports = {
    listAllCategory,
    findByCategory,
    createCategory,
}
