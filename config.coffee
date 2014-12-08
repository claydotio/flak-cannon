module.exports =
  ENV: process.env.NODE_ENV or 'production'
  ENVS:
    DEV: 'development'
    PROD: 'production'
    TEST: 'test'
  PORT: process.env.FLAK_CANNON_PORT or process.env.PORT or 50010
  MONGO:
    database: process.env.FLAK_CANNON_MONGO_DB or 'flak_cannon'
    host: process.env.MONGO_HOST or 'localhost'
    port: process.env.MONGO_PORT or 27017
  REDIS:
    PORT: 6379
    HOST: process.env.REDIS_HOST or 'localhost'
    PREFIX: 'fc'
