module.exports =
  env: process.env.NODE_ENV or 'production'
  envs:
    DEV: 'development'
    PROD: 'production'
    TEST: 'test'
  port: process.env.PORT or 3001
