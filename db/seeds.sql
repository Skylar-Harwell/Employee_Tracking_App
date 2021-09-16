INSERT INTO department (dept_name)
VALUES ("FINANCE"),
       ("HUMAN RESOURCES"),
       ("ENTERPRISE TECHNOLOGY"),
       ("CLAIMS"),
       ("UNDERWRITING"),
       ("CUSTOMER CONTACT CENTER");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 110000, 1),
       ("Intern", 30000, 2),
       ("Engineer", 85000, 3),
       ("Claim Specialist", 63000, 4), 
       ("Underwriter", 66000, 5),
       ("Public Relations Specialist", 58000, 6); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Karns", 1, NULL),       
       ("Timothy", "Smith", 2, 1),
       ("Sarah", "Whittle", 3, 2),
       ("Peter", "Parker", 5, NULL), 
       ("Steve", "Rogers", 2, NULL),
       ("Susan", "Storm", 1, NULL), 
       ("Jimothy", "Pistacio", 2, 3),
       ("Scott", "Summers", 5, NULL),
       ("Peter", "Gabriel", 5, NULL),
       ("Jack", "Burton", 1, NULL), 
       ("Gracie", "Law", 6, NULL),
       ("Wang", "Chen", 2, NULL), 
       ("Michael", "Scott", 1, NULL), 
       ("Dwight", "Schrute", 4, NULL), 
       ("Pam", "Beasley", 4, NULL), 
       ("Jim", "Halpert", 4, 4), 
       ("Meridith", "Harper", 6, NULL),
       ("Stacy", "Howard", 4, NULL),
       ("Jabitha", "Hutt", 6, 5),
       ("Jennifer", "Mason", 6, NULL);