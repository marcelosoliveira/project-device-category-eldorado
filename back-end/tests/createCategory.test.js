const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/category';

describe('Application must have POST endpoint `/create`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('It will be validated that it is possible to successfully register a category.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Ortopedia',
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Category created successfully.");
      });
  });

  it('It will be validated that it is not possible to register a category with the `name` field greater than 128 characters.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: `A developer's computer, is getting outdated to perform
          projects and use frameworks that are currently on the market....`,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid field name!");
      });
  });

  it('t will be validated that the `name` field is mandatory.', async () => {
    await frisby
      .post(`${url}/create`,
        {

        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid field name!");
      });
  });

  it('It will be validated that the `name` field is a string.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 1233,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid field name!");
      });
  });

  it('It will be validated that the `name` field is less than 3 characters.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Co',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid field name!");
      });
  });
});
