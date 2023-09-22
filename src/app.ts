import cors from 'cors';
import express, { json, Express } from 'express';
import 'express-async-errors';
import router from '@/routers';
import { connectToDatabase, disconnectDatabase } from '@/database';
import errorsHandler from './middlewares/errors-handler.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '@/docs/swagger.json';

const app = express();

app.use([json(), cors()]);
app.use(router);
app.use(errorsHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export function init(): Promise<Express> {
  connectToDatabase();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDatabase();
}

export default app;
