CREATE TABLE users(
  id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
)


-- THIS IS A PIVOTE LIKE A HISTORY
-- UPDATE THIS TABLE
CREATE TABLE pays(
  id_pay VARCHAR(36) ,
  amount INT NOT NULL,
  id_user VARCHAR(36),
  id_lend VARCHAR(36),
  PRIMARY KEY(id_user, id_lend),
);

CREATE TABLE lends(
  id VARCHAR(36) NOT NULL,
  id_user VARCHAR(36) NOT NULL,
  amount INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(id_user) REFERENCES users(id)
  ON DELETE CASCADE
)


/*
CREATE TABLE pays(
  id_pay VARCHAR(36),
  amount INT NOT NULL,
  id_user VARCHAR(36),
  id_lend VARCHAR(36),
  PRIMARY KEY(id_user, id_lend),
  FOREIGN KEY(id_user) REFERENCES users(id)
  ON DELETE CASCADE,
);

*/