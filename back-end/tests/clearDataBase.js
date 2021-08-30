const conn = require('../config/connect');

const dropDatabase = async () => await conn
.execute('DROP DATABASE IF EXISTS device_category;');

const createDataBase = async () => await conn
.execute('CREATE DATABASE IF NOT EXISTS device_category;');

const createTableCategory = async () => await conn.execute(
    `CREATE TABLE IF NOT EXISTS device_category.category (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(128) NOT NULL
    ) ENGINE InnoDB;`);


const createTableDevice = async () => await conn.execute(
    `CREATE TABLE IF NOT EXISTS device_category.device (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      color VARCHAR(16) NOT NULL,
      part_number INTEGER NOT NULL,
      id_category INTEGER NOT NULL,
      FOREIGN KEY (id_category) REFERENCES category(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    ) ENGINE InnoDB;`);

const insertTableCategory = async () => {
    await conn.execute(`INSERT INTO device_category.category(name) VALUES('Eletronicos');`);
    await conn.execute(`INSERT INTO device_category.category(name) VALUES('Jardim');`);
    await conn.execute(`INSERT INTO device_category.category(name) VALUES('Mecânica');`);
    await conn.execute(`INSERT INTO device_category.category(name) VALUES('Cozinha');`);
    await conn.execute(`INSERT INTO device_category.category(name) VALUES('Automotivos');`);
}

const insertTableDevice = async () => {
    await conn.execute(`INSERT INTO device_category.device(
      name, color, part_number, id_category)VALUES('Notbook', 'Azul', 1111, 1);`);
    await conn.execute(`INSERT INTO device_category.device(
      name, color, part_number, id_category) VALUES('Carro', 'Verde', 1121, 5);`);
    await conn.execute(`INSERT INTO device_category.device(
      name, color, part_number, id_category) VALUES('Chave Inglesa', 'Preto', 1231, 3);`);
    await conn.execute(`INSERT INTO device_category.device(
      name, color, part_number, id_category) VALUES('Vazo', 'Marrom', 1431, 2);`);
    await conn.execute(`INSERT INTO device_category.device(
      name, color, part_number, id_category) VALUES('Colher', 'Vermelho', 1141, 4);`);
}

const closeConnection = async () => await conn.close();

const deleteAndCreateDataBase = async () => {
  await dropDatabase();
  await createDataBase();
}

const createTables = async () => {  
  await createTableCategory();  
  await createTableDevice();
  await insertTableCategory();
  await insertTableDevice();
}

module.exports = {
  deleteAndCreateDataBase,
  createTables,
  closeConnection,
}