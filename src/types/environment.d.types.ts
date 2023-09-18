export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGO_URI: string;
      JWT_SECRET: string;
      BCRYPT_SALT: number;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
