import app, { init } from '@/app';
import env from './utils/env.config';

const PORT = env.PORT || 5000;

init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT} ✅`);
  });
});
