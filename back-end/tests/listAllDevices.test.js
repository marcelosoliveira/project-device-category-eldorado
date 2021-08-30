const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1';

describe('Aplicação deve ter o endpoint GET `/device`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('Será validado que é possível listar todos os dispositivos', async () => {
    await frisby
      .get(`${url}/device`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        const firstDevice = json[0];
        const secondDevice = json[1];
        expect(firstDevice.name).toBe('Notbook');
        expect(firstDevice.color).toBe('Azul');
        expect(firstDevice.part_number).toBe(1111);
        expect(secondDevice.name).toBe('Carro');
        expect(secondDevice.color).toBe('Verde');
        expect(secondDevice.part_number).toBe(1121);
      });
  });

  it('Será validado que é possível listar todos os dispositivos filtrado pelo id da categoria', async () => {
    await frisby
      .post(`${url}/device/create`,
        {
          name: 'Computador',
          color: 'Preto',
          part_number: 1234,
          id_category: 1,
        });
    await frisby
      .get(`${url}/device/category/${1}`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        const firstDevice = json[0];
        const secondDevice = json[1];
        expect(firstDevice.name).toBe('Notbook');
        expect(firstDevice.color).toBe('Azul');
        expect(firstDevice.part_number).toBe(1111);
        expect(firstDevice.category).toBe('Eletronicos');
        expect(secondDevice.name).toBe('Computador');
        expect(secondDevice.color).toBe('Preto');
        expect(secondDevice.part_number).toBe(1234);
        expect(secondDevice.category).toBe('Eletronicos');
      });
  });
});
