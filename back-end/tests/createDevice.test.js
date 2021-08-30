const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/device';

describe('Application must have POST endpoint `/create`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('It will be validated that it is possible to successfully register a device.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto',
          part_number: 1234,
          id_category: 1,
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Device created successfully.");
      });
  });

  it('It will be validated that it is not possible to register device with the `color` field greater than 16 characters.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto com um tom de azul',
          part_number: 1234,
          id_category: 1,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid color field!");
      });
  });

  it('It will be validated that it is not possible to register device with the same part number (part_number) `part_number: 1111`.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto',
          part_number: 1111,
          id_category: 1,
        })
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Device part number already exists!");
      });
  });

  it('It will be validated that it is not possible to register device with part number (part_number) negative `part_number: -2222`.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto',
          part_number: -2222,
          id_category: 1,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid part number field!");
      });
  });

  it('It will be validated that it is not possible to register device with part number (part_number) less than 1 `part_number: 0`.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto',
          part_number: 0,
          id_category: 1,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid part number field!");
      });
  });

  it('It will be validated that it is not possible to register device with unregistered category.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto',
          part_number: 2222,
          id_category: 6,
        })
      .expect('status', 404)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Category not found ID: 6!");
      });
  });

  it('It will be validated that the `name` field is mandatory.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          color: 'Preto',
          part_number: 2222,
          id_category: 6,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid field name!");
      });
  });

  it('It will be validated that the `color` field is mandatory.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          part_number: 2222,
          id_category: 6,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid color field!");
      });
  });

  it('It will be validated that the `part_number` field is mandatory.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto',
          id_category: 6,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid part number field!");
      });
  });

  it('It will be validated that the `id_category` field is mandatory.', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          part_number: 2222,
          color: 'Preto',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Invalid category identification field!");
      });
  });
});
