const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1';

describe('Application must have endpoint GET `/category`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('It will be validated that it is possible to list all categories.', async () => {
    await frisby
      .get(`${url}/category`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        const firstCategory = json[0];
        const secondCategory = json[1];
        expect(firstCategory.name).toBe('Eletronicos');
        expect(secondCategory.name).toBe('Jardim');
      });
  });

  it('It will be validated that it is possible to create a category and list all categories.', async () => {
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
        expect(firstCategory.name).toBe('Ortopedia');
      });
  });
});
