const { PORT = 3000, DB_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  PORT,
  DB_ADRESS,
};
