const inquirer = require('inquirer');
const mysql = require('mysql2');
// const cTable = require('console.table');

const selectDepartmentSQL = "SELECT * FROM DEPARTMENT;";
const selectRoleSQL = "SELECT * FROM ROLE;";
const selectEmployeeSQL = "SELECT * FROM EMPLOYEE;";

// Connect to the database
const connection = mysql.createConnection({
  password: "SQL!2468",
  host: '127.0.0.1',
  user: 'root',
  database: 'company_db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0
});

function viewAllDepartments() {
  connection.query(selectDepartmentSQL, function (err, results, fields) {
    if (err) {
      console.log("An error occurred while fetching departments!");
      return;
    }
    console.table(results);
    init()
  });
}

function viewAllRoles() {
  connection.query(selectRoleSQL, function (err, results, fields) {
    if (err) {
      console.log("An error occurred while fetching roles!");
      return;
    }
    console.table(results);
    init()
  });
}

function viewAllEmployees() {
  connection.query(selectEmployeeSQL, function (err, results, fields) {
    if (err) {
      console.log("An error occurred while fetching employees!");
      return;
    }
    console.table(results);
    init()
  });
}

function insertDepartment(id, name) {
  connection.query(`INSERT INTO DEPARTMENT(dept_name) VALUES ( '${name}')`, function (err, results, fields) {
    if (err) {
      console.log("An error occurred while adding the department!");
      return;
    }
    console.log("Department successfully added!");
    init()
  });
}

function insertRole(id, title, salary, departmentId) {
  connection.query(`INSERT INTO ROLE(id, title, salary, department_id) VALUES ( '${title}', ${salary}, ${departmentId})`, function (err, results, fields) {
    if (err) {
      console.log("An error occurred while adding the role!");
      return;
    }
    console.log("Role successfully added!");
    init()
  });
}

function insertEmployee(id, firstName, lastName, roleId, managerId = null) {
  connection.query(`INSERT INTO EMPLOYEE(id, first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`, function (err, results, fields) {
    if (err) {
      console.log("An error occurred while adding the employee!");
      return;
    }
    console.log("Employee successfully added!");
    init()
  });
}

function updateEmployee(id, roleId) {
  connection.query(`UPDATE EMPLOYEE SET role_id = ${roleId} WHERE id = ${id}`, function (err, results, fields) {
    if (err) {
      console.log("An error occurred while updating the employee!");
      return;
    }
    console.log("Employee role successfully updated!");
  });
}
function init(){




inquirer.prompt([
  {
    name: 'option',
    message: 'What would you like to do?',
    type: 'list',
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role"]
  }
]).then(function (answer) {
  switch (answer.option) {
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "View all employees":
      viewAllEmployees();
      break;
    case "Add a department":
      inquirer.prompt([
        {
          name: 'departmentId',
          message: 'Enter the Department ID:',
          type: 'input'
        },
        {
          name: 'departmentName',
          message: 'Enter the Department Name:',
          type: 'input'
        }
      ]).then(function (answer) {
        insertDepartment(answer.departmentId, answer.departmentName);
      });
      break;
    case "Add a role":
      inquirer.prompt([
        {
          name: 'roleId',
          message: 'Enter the Role ID:',
          type: 'input'
        },
        {
          name: 'roleTitle',
          message: 'Enter the Role Title:',
          type: 'input'
        },
        {
          name: 'roleSalary',
          message: 'Enter the Salary:',
          type: 'input'
        },
        {
          name: 'roleDepartmentId',
          message: 'Enter the Department ID:',
          type: 'input'
        }
      ]).then(function (answer) {
        insertRole(answer.roleId, answer.roleTitle, answer.roleSalary, answer.roleDepartmentId);
      });
      break;
    case "Add an employee":
      inquirer.prompt([
        {
          name: 'employeeId',
          message: 'Enter the Employee ID:',
          type: 'input'
        },
        {
          name: 'employeeFirstName',
          message: 'Enter the First Name:',
          type: 'input'
        },
        {
          name: 'employeeLastName',
          message: 'Enter the Last Name:',
          type: 'input'
        },
        {
          name: 'employeeRoleId',
          message: 'Enter the Role ID:',
          type: 'input'
        },
        {
          name: 'managerId',
          message: 'Enter the Manager ID (optional):',
          type: 'input'
        }
      ]).then(function (answer) {
        insertEmployee(answer.employeeId, answer.employeeFirstName, answer.employeeLastName, answer.employeeRoleId, answer.managerId);
      });
      break;
    case "Update an employee's role":
      inquirer.prompt([
        {
          name: 'employeeId',
          message: 'Enter the Employee ID to update:',
          type: 'input'
        },
        {
          name: 'roleId',
          message: 'Enter the new Role ID:',
          type: 'input'
        }
      ]).then(function (answer) {
        updateEmployee(answer.employeeId, answer.roleId);
      });
      break;
    default:
      break;
  }
});
}
init();

