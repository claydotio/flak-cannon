module.exports =
  env: process.env.NODE_ENV or 'production'
  envs:
    DEV: 'development'
    PROD: 'production'
    TEST: 'test'
  port: process.env.PORT or 3001
  mongo:
    database: process.env.MONGO_DB or 'flak_cannon'
    host: process.env.MONGO_HOST or 'localhost'
    port: process.env.MONGO_PORT or 27017
