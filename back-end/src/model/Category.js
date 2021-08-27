const conn = require('../../config/connect')

const listAllCategory = async () => {
    const [category] = await conn.execute(`SELECT * FROM category`);

    return category;
}

const findByCategory = async (id) => {
    const category = await conn.execute(`SELECT * FROM category WHERE c.id = ?`, [id]);

    return category;
}

const createCategory = async (name) => {
    await conn.execute(`INSERT INTO category(name) VALUES(?)`,
    [name, cor, part_number, id_category]);
}

module.exports = {
    listAllCategory,
    findByCategory,
    createCategory,
}