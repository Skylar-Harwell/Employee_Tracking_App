DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

USE departments_db;

CREATE TABLE department (
    id_dept INT NOT NULL AUTO_INCREMENT, 
    dept_name VARCHAR(30),
    PRIMARY KEY (id_dept)
);

CREATE TABLE roles (
    id_role INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT,
    PRIMARY KEY (id_role),
    CONSTRAINT fk_department
    FOREIGN KEY (department_id) REFERENCES department(id_dept) 
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id_emp INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id_emp),
    CONSTRAINT fk_roles
    FOREIGN KEY (role_id) REFERENCES roles(id_role)
    ON DELETE CASCADE, 
    FOREIGN KEY (manager_id) REFERENCES employee(id_emp)
    ON DELETE CASCADE
);

 