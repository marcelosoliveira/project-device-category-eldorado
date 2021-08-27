DROP DATABASE IF EXISTS device_category;

CREATE DATABASE IF NOT EXISTS device_category;

USE device_category;

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL
) ENGINE InnoDB DEFAULT CHARSET='utf8';

CREATE TABLE IF NOT EXISTS device (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    cor VARCHAR(16) NOT NULL,
    part_number INTEGER NOT NULL,
    id_category INTEGER NOT NULL,
    FOREIGN KEY (id_category) REFERENCES category(id)
) ENGINE InnoDB DEFAULT CHARSET='utf8';

INSERT INTO category(name) VALUES('Eletronicos');
INSERT INTO category(name) VALUES('Serviços');
INSERT INTO category(name) VALUES('Mecânica');
INSERT INTO category(name) VALUES('Cozinha');
INSERT INTO category(name) VALUES('Automotivos');

INSERT INTO device(category, cor, part_number, id_category)
VALUES('Eletronicos', 'Azul', 1111, 1);
INSERT INTO device(category, cor, part_number, id_category)
VALUES('Automotivos', 'Verde', 1121, 5);
INSERT INTO device(category, cor, part_number, id_category)
VALUES('Mecânica', 'Preto', 1231, 3);
INSERT INTO device(category, cor, part_number, id_category)
VALUES('Serviços', 'Marrom', 1431, 2);
INSERT INTO device(category, cor, part_number, id_category)
VALUES('Cozinha', 'Vermelho', 1141, 4);
