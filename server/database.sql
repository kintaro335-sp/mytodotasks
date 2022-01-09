CREATE DATABASE todotask;

use todotask;

CREATE TABLE tareas (
  id VARCHAR(36) NOT NULL,
  done BOOLEAN DEFAULT 0,
  nombre VARCHAR(50) NOT NULL,
  descripcion MEDIUMTEXT DEFAULT '',
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userid  VARCHAR(36) DEFAULT '00000000-0000-0000-0000-000000000000',
  primary key (id)
);

CREATE TABLE users (
  id VARCHAR(36) NOT NULL,
  username VARCHAR(30) NOT NULL,
  passwordu VARCHAR(64) NOT NULL,
  primary key (id)
);
