import app, { init, close } from '@/app';
import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import { clearDatabase, deleteUser, generateValidToken } from '../helpers';
import { createUser } from '../factories/user.factory';

beforeAll(async () => {
  await init();
  await clearDatabase();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe('GET /perfil/:userId', () => {
  const validUserIdParam = faker.string.hexadecimal({ length: 24, prefix: '' });

  it('should respond with status 400 when userId param is not valid', async () => {
    const invalidUserIdParam = 1;
    const response = await server.get(`/perfil/${invalidUserIdParam}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 404 when user does not exist', async () => {
    const response = await server.get(`/perfil/${validUserIdParam}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and user data', async () => {
    const user = await createUser();
    const response = await server.get(`/perfil/${user.id}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.createdAt.toISOString(),
    });
  });
});

describe('PATCH /perfil/senha/alterar/:userId', () => {
  const validUserIdParam = faker.string.hexadecimal({ length: 24, prefix: '' });

  it('should respond with status 400 when userId param is not valid', async () => {
    const invalidUserIdParam = 1;
    const response = await server.patch(`/perfil/senha/alterar/${invalidUserIdParam}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 401 when token is not provided', async () => {
    const response = await server.patch(`/perfil/senha/alterar/${validUserIdParam}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if provided token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server
      .patch(`/perfil/senha/alterar/${validUserIdParam}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    const generateValidBody = (currentPassword?: string) => ({
      currentPassword: currentPassword || faker.internet.password({ prefix: 'A@a1' }),
      newPassword: faker.internet.password({ prefix: 'A@a1' }),
    });

    it('should respond with status 400 when body is not valid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server
        .patch(`/perfil/senha/alterar/${validUserIdParam}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 401 when currentPassword is incorrect', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = generateValidBody();

      const response = await server
        .patch(`/perfil/senha/alterar/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 when the userId received by route parameter is not the authenticated userId', async () => {
      const authenticatedUser = await createUser();
      const anotherUser = await createUser();
      const token = await generateValidToken(authenticatedUser);
      const body = generateValidBody();

      const response = await server
        .patch(`/perfil/senha/alterar/${anotherUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 404 when authenticated user does not exist anymore', async () => {
      const user = await createUser();
      const deletedUserId = user.id;
      await deleteUser(user);
      const token = await generateValidToken(user);
      const body = generateValidBody();

      const response = await server
        .patch(`/perfil/senha/alterar/${deletedUserId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 404 when user (received by userId param) does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = generateValidBody();

      const response = await server
        .patch(`/perfil/senha/alterar/${validUserIdParam}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and change user password', async () => {
      const password = faker.internet.password({ prefix: 'A@a1' });
      const user = await createUser({ password });
      const token = await generateValidToken(user);
      const body = generateValidBody(password);

      const response = await server
        .patch(`/perfil/senha/alterar/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
