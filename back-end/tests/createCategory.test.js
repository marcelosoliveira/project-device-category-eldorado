const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/category';

describe('4 - Sua aplicação deve ter o endpoint POST `/create`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('Será validado que é possível cadastrar uma categoria com sucesso', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Ortopedia',
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Categoria criada com sucesso!");
      });
  });

  it('Será validado que não é possível cadastrar categoria com o campo `name` maior que 128 caracteres', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: `Computador de um desenvolvedor, está ficando ultrapassa para realizar 
          projetos e utilizar frameworks que está no mercado atualmente.`,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Campo nome inválido!");
      });
  });

  it('Será validado que o campo `name` é obrigatório', async () => {
    await frisby
      .post(`${url}/create`,
        {

        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Campo nome inválido!");
      });
  });

  it('Será validado que o campo `name` é uma string', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 1233,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Campo nome inválido!");
      });
  });

  it('Será validado que o campo `name` é menor que 3 caracteres', async () => {
    await frisby
      .post(`${url}/create`,
        {
          name: 'Co',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe("Campo nome inválido!");
      });
  });
});
