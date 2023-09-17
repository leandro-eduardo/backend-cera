import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import router from '@/routers';

dotenv.config();

const app = express();

app.use([json(), cors()]);
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT} ✅`));
