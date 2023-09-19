import cors from 'cors';
import express, { json, Express } from 'express';
import 'express-async-errors';
import router from '@/routers';
import { connectToDatabase, disconnectDatabase } from '@/database';
import errorsHandler from './middlewares/errors-handler.middleware';

const app = express();

app.use([json(), cors()]);
app.use(router);
app.use(errorsHandler);

export function init(): Promise<Express> {
  connectToDatabase();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDatabase();
}

export default app;
