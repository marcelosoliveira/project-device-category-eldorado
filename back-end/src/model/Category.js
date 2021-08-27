const conn = require('../../config/connect')

const listAllCategory = async () => {
    const [category] = await conn.execute(`SELECT * FROM category`);

    return category;
}

const findByCategory = async (name) => {
    const [category] = await conn.execute(`SELECT * FROM category WHERE name = ?`, [name]);

    return category[0];
}

const createCategory = async (name) => {
    await conn.execute(`INSERT INTO category(name) VALUES(?)`, [name]);
}

module.exports = {
    listAllCategory,
    findByCategory,
    createCategory,
}