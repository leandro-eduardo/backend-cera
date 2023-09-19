import app, { init, close } from '@/app';
import supertest from 'supertest';
import status from 'http-status';
import { faker } from '@faker-js/faker';
import { createUser } from '../factories/user.factory';
import { cleanDatabase } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDatabase();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe('POST /autenticacao/entrar', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/autenticacao/entrar');

    expect(response.status).toBe(status.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/autenticacao/entrar').send(invalidBody);

    expect(response.status).toBe(status.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    it('should respond with status 401 if there is no user for given email', async () => {
      const body = generateValidBody();

      const response = await server.post('/autenticacao/entrar').send(body);

      expect(response.status).toBe(status.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is a user for given email but password is not correct', async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post('/autenticacao/entrar').send({
        ...body,
        password: faker.lorem.word(),
      });

      expect(response.status).toBe(status.UNAUTHORIZED);
    });

    describe('when credentials are valid', () => {
      it('should respond with status 200', async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post('/autenticacao/entrar').send(body);

        expect(response.status).toBe(status.OK);
      });

      it('should respond with user data', async () => {
        const body = generateValidBody();
        const user = await createUser(body);

        const response = await server.post('/autenticacao/entrar').send(body);

        expect(response.body.user).toEqual({
          id: user.id,
          email: user.email,
        });
      });

      it('should respond with session token', async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post('/autenticacao/entrar').send(body);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});
