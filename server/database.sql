CREATE DATABASE todotask;

use todotask;

CREATE TABLE tareas (
  id VARCHAR(36) NOT NULL,
  done BOOLEAN DEFAULT 0,
  nombre VARCHAR(50) NOT NULL,
  descripcion MEDIUMTEXT DEFAULT '',
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);
