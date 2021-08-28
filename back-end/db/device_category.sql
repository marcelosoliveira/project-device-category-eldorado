DROP DATABASE IF EXISTS device_category;

CREATE DATABASE IF NOT EXISTS device_category;

USE device_category;

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS device (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(16) NOT NULL,
    part_number INTEGER NOT NULL,
    id_category INTEGER NOT NULL,
    FOREIGN KEY (id_category) REFERENCES category(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE InnoDB;

INSERT INTO category(name) VALUES('Eletronicos');
INSERT INTO category(name) VALUES('Jardim');
INSERT INTO category(name) VALUES('Mecânica');
INSERT INTO category(name) VALUES('Cozinha');
INSERT INTO category(name) VALUES('Automotivos');

INSERT INTO device(name, color, part_number, id_category)
VALUES('Notbook', 'Azul', 1111, 1);
INSERT INTO device(name, color, part_number, id_category)
VALUES('Carro', 'Verde', 1121, 5);
INSERT INTO device(name, color, part_number, id_category)
VALUES('Chave Inglesa', 'Preto', 1231, 3);
INSERT INTO device(name, color, part_number, id_category)
VALUES('Vazo', 'Marrom', 1431, 2);
INSERT INTO device(name, color, part_number, id_category)
VALUES('Colher', 'Vermelho', 1141, 4);
