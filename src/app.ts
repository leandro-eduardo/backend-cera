import cors from 'cors';
import express, { json } from 'express';
import router from '@/routers';
import { connectToDatabase } from '@/database';
import env from '@/utils/env.config';

const app = express();

app.use([json(), cors()]);
app.use(router);

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running at port ${PORT} ✅`);
});
