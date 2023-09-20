import app, { init, close } from '@/app';
import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import { createUser } from '../factories/user.factory';
import { cleanDatabase } from '../helpers';
import UserModel from '@/models/user.model';

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

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/autenticacao/entrar').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    it('should respond with status 401 if there is no user for given email', async () => {
      const body = generateValidBody();

      const response = await server.post('/autenticacao/entrar').send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is a user for given email but password is not correct', async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post('/autenticacao/entrar').send({
        ...body,
        password: faker.lorem.word(),
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when credentials are valid', () => {
      it('should respond with status 200', async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post('/autenticacao/entrar').send(body);

        expect(response.status).toBe(httpStatus.OK);
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

describe('POST /autenticacao/registrar', () => {
  const generateValidBody = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ prefix: 'A@a1' }),
    phone: faker.phone.number('##9########'),
  });

  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/autenticacao/registrar');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/autenticacao/registrar').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when the password does not meet the minimum security requirements', async () => {
    const invalidBody = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number('##9########'),
    };

    const response = await server.post('/autenticacao/registrar').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 409 when there is an user with given email', async () => {
    const body = generateValidBody();
    await createUser(body);

    const response = await server.post('/autenticacao/registrar').send(body);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it('should respond with status 201 and create user when given email is unique', async () => {
    const body = generateValidBody();

    const response = await server.post('/autenticacao/registrar').send(body);

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it('should save user on database', async () => {
    const body = generateValidBody();

    const response = await server.post('/autenticacao/registrar').send(body);

    const user = await UserModel.findOne({
      email: body.email,
    });

    expect(user).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: body.name,
        email: body.email,
        phone: body.phone,
      })
    );
  });
});
