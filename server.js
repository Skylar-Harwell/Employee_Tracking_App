const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");
const { brotliDecompress } = require("zlib");

require("dotenv").config();

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "departments_db",
  },
  console.table(`Connected to the departments_db database.`)
);

figlet("EMPLOYEE TRACKER", function (err, data) {
  if (err) {
    console.log("ERROR - FAILED TO LOAD");
    return;
  }
  console.log(data);
  promptUser();
});

function showAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, departments) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("All Company Departments", departments);
    promptUser();
  });
}

function showAllRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, roles) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("All Company Roles", roles);
    promptUser();
  });
}

function showAllEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, employees) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("All Company Employees", employees);
    promptUser();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "addDepartment",
      type: "input",
      message: "What is the Department Name to add?",
    })
    .then(function (answer) {
      db.query(
        "INSERT INTO department (dept_name) VALUES (?)",
        answer.addDepartment,
        function (err, res) {
          if (err) {
            console.log(err);
          }
          console.log(res);
        }
      );
      promptUser();
    });
}

function addRole() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, departments) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(departments);
    const deptArr = [];
    departments.forEach((newDept) => {
      deptArr.push({
        name: newDept.dept_name,
        value: newDept.id_dept,
      });
    });
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the Name of the Role?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter a Role Name.";
          },
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the Role?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a number over zero.";
          },
        },
        {
          name: "deptID",
          type: "list",
          message: "What is the Department ID of the Role",
          choices: deptArr,
        },
      ])
      .then(function (answer) {
        db.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.title, answer.salary, answer.deptID],
          function (err, res) {
            if (err) {
              console.log(err);
            }
            console.log("Role has been updated SUCESSFULLY!");
            promptUser();
          }
        );
      });
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the employee's First Name.",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employee's Last Name",
      },
      {
        name: "roleID",
        type: "input",
        message: "Enter the employee's Role ID",
      },
      {
        name: "mgrID",
        type: "input",
        message: "Enter the employee's Manager ID",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.firstName, answer.lastName, answer.roleID, answer.mgrID],
        function (err, res) {
          if (err) {
            console.log(err);
          }
          console.log(res);
          promptUser();
        }
      );
    });
}

function updateRole() {
  db.query(
    "SELECT id_emp, concat(first_name,' ', last_name) as fullName FROM employee ",
    function (err, res) {
      if (err) {
        console.log(err);
      }
      console.log(res);
      const decision = [];
      res.forEach((choice) => {
        decision.push({
          name: choice.fullName,
          value: choice.id_emp,
        });
      });
      const sql = `SELECT * FROM roles`;
      db.query(sql, (err, roles) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(roles);
        const rolesArr = [];
        roles.forEach((newRole) => {
          rolesArr.push({
            name: newRole.title,
            value: newRole.id_role,
          });
        });
        inquirer
          .prompt({
            name: "updateEmployee",
            type: "list",
            message: "What employee would you like to update?",
            choices: decision,
          })
          .then(function (answer) {
            // let value = answer.employee.split(" ");
            inquirer
              .prompt({
                name: "employee",
                type: "list",
                message: "What item you like to update?",
                choices: rolesArr,
              })
              .then(function (data) {
                // let option = "";
                // switch (answer.employee) {
                //   case "First Name":
                //     option = "firstName";
                //     break;
                //   case "Last Name":
                //     option = "lastName";
                //     break;
                //   case "Role ID":
                //     option = "roleID";
                //     break;
                //   case "Manager ID":
                //     option = "mgrID";
                //     break;
                db.query(
                  `UPDATE employee SET role_id = "${data.employee}" WHERE id_emp = ${answer.updateEmployee}`,
                  function (err) {
                    if (err) {
                      console.log(err);
                    }
                    promptUser();
                  }
                );
              });
          });
      });
    }
  );
}

function deleteDept() {
    const sql = `SELECT * FROM department`;
      db.query(sql, (err, dept) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(dept);
        const remDeptArr = [];
        dept.forEach((choice) => {
          remDeptArr.push({
            name: choice.dept_name,
            value: choice.id_dept,
          });
        });
  inquirer
    .prompt([
      {
        name: "department",
        type: "rawlist",
        message: "Which Department needs to be deleted?",
        choices: remDeptArr,
      },
    ])
    .then(function (res) {
      var bye = "DELETE FROM department WHERE dept_name = ?";
      db.query(bye, [res.department], function (err, res) {
        if (err) {
          console.log(err);
        }
        promptUser();
      });
    });
})
}

function deleteRole() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "rawlist",
        message: "Which Role needs to be deleted?",
        choices: roles.title,
      },
    ])
    .then(function (res) {
      var bye = "DELETE FROM roles WHERE name = ?";
      db.query(bye, [res.role], function (err, res) {
        if (err) {
          console.log(err);
        }
        promptUser();
      });
    });
}

function deleteEmp() {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "rawlist",
        message: "Which Employee needs to be deleted?",
        choices: employee.first_name,
      },
    ])
    .then(function (res) {
      var bye = "DELETE FROM employee WHERE name = ?";
      db.query(bye, [res.employee], function (err, res) {
        if (err) {
          console.log(err);
        }
        promptUser();
      });
    });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What do you want to do?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Delete a Department",
          "Delete a Role",
          "Delete an Employee",
          "Exit",
        ],
      },
    ])
    .then(function (data) {
      switch (data.options) {
        case "View all Departments":
          showAllDepartments();
          break;
        case "View all Roles":
          showAllRoles();
          break;
        case "View all Employees":
          showAllEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateRole();
          break;
        case "Delete a Department":
          deleteDept();
          break;
        case "Delete a Role":
          deleteRole();
          break;
        case "Delete an Employee":
          deleteEmp();
          break;
        case "Exit":
          db.end();
          break;
        default:
          return;
      }
    });
}

// promptUser();
