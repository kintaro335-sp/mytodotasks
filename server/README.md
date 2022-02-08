# server

## configuration 

create a database with the script database.sql

create a user in the database or use user root

install dependencies

```bash
npm install
```

before to start the server first you must config the env variables

see the .env sample.txt

the next env variables are required:

```.env
SQL_SERVER_USER=admin
SQL_SERVER_PASSWORD=12345678
SQL_SERVER_HOST=localhost
SQL_SERVER_DATABASE=todotasks
COOKIE_SECRET=cat
SERVER_CORS="*"
```
the cors serveer must be the ip or domain of the client otherwise the requests will be rejected

COOKIE_SEVCRET is the password of the cookies sesions, more info in the package express-session

SERVER_PORT is optional, the server starts in port 4000 by default

start the server with:

```bash
npm start
```

## commands

starts the server normally:

```bash
npm start
```

start the server in dev mode:

```bash
npm run dev
```
