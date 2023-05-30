DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

SELECT DATABASE();

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  role_id INT,

  FOREIGN KEY (role_id)
    REFERENCES role(id)
  ON DELETE SET NULL,

  FOREIGN KEY (manager_id)
    REFERENCES employee(id)
  ON DELETE SET NULL
);

INSERT INTO department (dept_name)
  VALUES ("Muppet Labs"),
        ("Sesame Street"),
        ("Electric Mayhem");

INSERT INTO role (title, salary, department_id)
  VALUES ("Intern", 50000, 1),
        ("Engineer", 100000, 1),
       ("Manager", 1300000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES  ("Bunsen", "Honeydew", 3, 1),
        ("Beaker", "Beaker", 2, 1),
        ("Kermit", "Frog", 1, 3);