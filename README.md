Frontend page: http://localhost:3050/index.html

## Deployment

1. Install dependencies `npm install`
2. You must ensure that the application has access to the following environment variables:

API_PORT - Port number on which the API server should listen for incoming requests.

#DATABASE
REDIS_HOST - Hostname or IP address of the server where the database is located.
REDIS_PORT - Port number on which the database server is listening for connections.
REDIS_PASSWORD - Password used for authentication when connecting to the database.
DEFAULT_EX - Specifies the default expiration time (in seconds) for keys in Redis.

3. Start node.js application (dev mode).

## NPM scripts

- `npm install`: Install the dependencies
- `npm run start`: Start node.js application
- `npm run dev`: Start development mode (nodemon)

4. `docker-compose up`: Single command to start project
