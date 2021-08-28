const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/category';

describe('Aplicação deve ter o endpoint DELETE `/delete/:id`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('Será validado que é possível excluir uma categoria com sucesso', async () => {
    await frisby
      .delete(`${url}/delete/${1}`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Categoria deletada com sucesso Id: 1");
      });
  });

  it('Será validado que não é possivel excluir uma categoria que não existe', async () => {
    await frisby
    .delete(`${url}/delete/${1}`)
    .expect('status', 404)
    .then((response) => {
      const { json } = response;
      expect(json.message).toBe("Categoria não encontrada! ID: 1");
    });
  });
});
