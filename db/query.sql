SELECT department.
FROM roles
LEFT JOIN department
ON roles.department_id = department.id

SELECT roles.department_id
FROM roles
LEFT JOIN department
ON department.id_dept = roles.department_id
WHERE department.id_dept IS NULL

SELECT employee.role_id
FROM employee
LEFT JOIN roles
ON employee.role_id = roles.id_role
LEFT JOIN 
WHERE employee.role_id IS NULL

SELECT employee.id_emp
FROM employee
LEFT JOIN employee
ON employee.id_emp = employee.manager_id
WHERE employee.id_emp IS NULL



SELECT child_table.* 
FROM child_table 
LEFT JOIN parent_table 
  ON parent_table.referenced_column = child_table.referencing_column 
WHERE parent_table.referenced_column IS NULL


-- Delete all data from output of that query