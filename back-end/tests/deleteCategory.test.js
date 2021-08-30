const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/category';

describe('Application must have DELETE endpoint `/delete/:id`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  let id = 0;

  it('It will be validated that it is possible to delete a category successfully.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Ortopedia',
        });
    await frisby
      .get(`${url}/`)
      .then((response) => {
        const { json } = response;
        const { id: idCategory } = json[json.length - 1];
        id = idCategory;
      });
    await frisby
      .delete(`${url}/delete/${id}`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe(`Category successfully deleted Id: ${id}.`);
      });
  });

  it('It will be validated that it is not possible to delete a category that does not exist.', async () => {
    await frisby
    .delete(`${url}/delete/${id}`)
    .expect('status', 404)
    .then((response) => {
      const { json } = response;
      expect(json.message).toBe(`Category not found! ID: ${id}!`);
    });
  });
});
