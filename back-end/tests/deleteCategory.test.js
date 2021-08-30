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

  let id = 0;

  it('Será validado que é possível excluir uma categoria com sucesso', async () => {
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
        expect(json.message).toBe(`Categoria deletada com sucesso Id: ${id}`);
      });
  });

  it('Será validado que não é possivel excluir uma categoria que não existe', async () => {
    await frisby
    .delete(`${url}/delete/${id}`)
    .expect('status', 404)
    .then((response) => {
      const { json } = response;
      expect(json.message).toBe(`Categoria não encontrada! ID: ${id}`);
    });
  });
});
