export const configuration = () => ({
  prefix: 'api',
  environment: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
})
