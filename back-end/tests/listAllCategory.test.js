const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1';

describe('2 - Sua aplicação deve ter o endpoint GET `/category`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('Será validado que é possível listar todas as categorias', async () => {
    await frisby
      .get(`${url}/category`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        console.log(json)
        const firstCategory = json[0];
        const secondCategory = json[1];
        expect(firstCategory.Name).toBe('Eletronicos');
        expect(secondCategory.Name).toBe('Jardim');
      });
  });

  it('Será validado que é possível criar uma categoria e listar todas as categorias', async () => {
    await frisby
      .post(`${url}/category/create`,
        {
          name: 'Ortopedia',
        });
    await frisby
      .get(`${url}/category`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        const firstCategory = json[json.length - 1];
        expect(firstCategory.Name).toBe('Ortopedia');
      });
  });
});
