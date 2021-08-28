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
        expect(firstDevice.Name).toBe('Notbook');
        expect(firstDevice.Color).toBe('Azul');
        expect(firstDevice.PartNumber).toBe(1111);
        expect(secondDevice.Name).toBe('Carro');
        expect(secondDevice.Color).toBe('Verde');
        expect(secondDevice.PartNumber).toBe(1121);
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
      .get(`${url}/device/${1}`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        const firstDevice = json[0];
        const secondDevice = json[1];
        expect(firstDevice.Name).toBe('Notbook');
        expect(firstDevice.Color).toBe('Azul');
        expect(firstDevice.PartNumber).toBe(1111);
        expect(firstDevice.Category).toBe('Eletronicos');
        expect(secondDevice.Name).toBe('Computador');
        expect(secondDevice.Color).toBe('Preto');
        expect(secondDevice.PartNumber).toBe(1234);
        expect(secondDevice.Category).toBe('Eletronicos');
      });
  });
});
