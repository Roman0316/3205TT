const { PORT } = require('./dotenv/config');
const app = require('./app');
const { init } = require('./services/redis');

async function start() {
  init();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(0);
});
