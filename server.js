
const express = require('express');
const os = require('os');
const { checkConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Read environment variables for MySQL and app config
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const appName = process.env.APP_NAME;
const appEnv = process.env.APP_ENV;

app.get('/', (req, res) => {
  checkConnection((isConnected, err) => {
    let dbMsg = isConnected ? '✅ Connexion à la BDD établie' : `❌ Connexion à la BDD échouée: ${err && err.message}`;
    res.send(`[v2] Hello World! New Version!<br>Processed by: ${os.hostname()}<br>App: ${appName} | Env: ${appEnv}<br>DB: ${dbName} | User: ${dbUser}<br>${dbMsg}`);
  });
});

app.get('/exit', (req, res) => {
  res.send('Exiting...');
  process.exit(1);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`App Name: ${appName}, Env: ${appEnv}`);
  console.log(`DB Name: ${dbName}, User: ${dbUser}`);
});
