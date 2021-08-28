const frisby = require('frisby');
const { 
  closeConnection,
  createTables,
  deleteAndCreateDataBase
} = require('./clearDataBase');

const url = 'http://localhost:3000/api/v1/device';

describe('1 - Sua aplicação deve ter o endpoint POST `/create`', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeAll(async () => await createTables());

  afterAll(async () => await closeConnection());

  it('Será validado que é possível cadastrar um dispositivo com sucesso', async () => {
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
        expect(json.message).toBe("Dispositivo criado com sucesso");
      });
  });

  it('Será validado que não é possível cadastrar dispositivo com o campo `color` maior que 16 caracteres', async () => {
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
        expect(json.message).toBe("Campo cor inválido!");
      });
  });

  it('Será validado que não é possível cadastrar dispositivo com o número de peça(part_number) iguais `part_number: 1111`', async () => {
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
        expect(json.message).toBe("Número de peça do dispositivo já existe!");
      });
  });

  it('Será validado que não é possível cadastrar dispositivo com o número da peça(part_number) negativo `part_number: -2222`', async () => {
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
        expect(json.message).toBe("Campo número da peça inválido!");
      });
  });

  it('Será validado que não é possível cadastrar dispositivo com o número da peça(part_number) menor que 1 `part_number: 0`', async () => {
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
        expect(json.message).toBe("Campo número da peça inválido!");
      });
  });

  it('Será validado que não é possível cadastrar dispositivo com categoria não cadastrada', async () => {
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
        expect(json.message).toBe("Id de categoria não encontrado!");
      });
  });

  it('Será validado que o campo `name` é obrigatório', async () => {
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
        expect(json.message).toBe("Campo nome inválido!");
      });
  });

  it('Será validado que o campo `color` é obrigatório', async () => {
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
        expect(json.message).toBe("Campo cor inválido!");
      });
  });

  it('Será validado que o campo `part_number` é obrigatório', async () => {
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
        expect(json.message).toBe("Campo número da peça inválido!");
      });
  });

  it('Será validado que o campo `id_category` é obrigatório', async () => {
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
        expect(json.message).toBe("Campo identificação de categoria inválido!");
      });
  });
});
