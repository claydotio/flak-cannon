module.exports =
  env: process.env.NODE_ENV or 'production'
  envs:
    DEV: 'development'
    PROD: 'production'
  port: process.env.PORT or 3000
