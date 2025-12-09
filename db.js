const mysql = require('mysql');

const dbConfig = {
  host: process.env.DB_HOST || 'mysql', // Nom du service MySQL dans le cluster
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

function checkConnection(callback) {
  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      callback(false, err);
    } else {
      callback(true);
    }
    connection.end();
  });
}

module.exports = { checkConnection };
