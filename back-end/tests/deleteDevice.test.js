const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/device';

describe('3 - Sua aplicação deve ter o endpoint DELETE `/delete/:id`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('Será validado que é possível excluir um dispositivo com sucesso', async () => {
    await frisby
      .delete(`${url}/delete/${1}`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Dispositivo deletado com sucesso Id: 1");
      });
  });

  it('Será validado que não é possivel excluir um dispositivo que não existe', async () => {
    await frisby
    .delete(`${url}/delete/${1}`)
    .expect('status', 404)
    .then((response) => {
      const { json } = response;
      expect(json.message).toBe("Dispositivo não encontrada! ID: 1");
    });
  });
});
