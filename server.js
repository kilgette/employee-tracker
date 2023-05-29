const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
require("dotenv").config()
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();