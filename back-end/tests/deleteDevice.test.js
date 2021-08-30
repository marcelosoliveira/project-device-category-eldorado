const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/device';

describe('Aplicação deve ter o endpoint DELETE `/delete/:id`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  let id = 0

  it('Será validado que é possível excluir um dispositivo com sucesso', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Computador',
          color: 'Preto',
          part_number: 1234,
          id_category: 1,
        });
    await frisby
      .get(`${url}/`)
      .then((response) => {
        const { json } = response;
        const { id: idDevice } = json[json.length - 1];
        id = idDevice;
      });
    await frisby
      .delete(`${url}/delete/${id}`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe(`Dispositivo deletado com sucesso Id: ${id}`);
      });
  });

  it('Será validado que não é possivel excluir um dispositivo que não existe', async () => {
    await frisby
    .delete(`${url}/delete/${id}`)
    .expect('status', 404)
    .then((response) => {
      const { json } = response;
      expect(json.message).toBe(`Dispositivo não encontrada! ID: ${id}`);
    });
  });
});
