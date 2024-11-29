/* eslint-env node */
/* eslint strict: ["error", "global"] */


'use strict';


const fs = require('fs');
const readline = require('readline');


const countStudents = (path) => new Promise((resolve, reject) => {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }


    const students = [];
    const fields = {};


    const readStream = fs.createReadStream(path);
    const rl = readline.createInterface({ input: readStream });


    rl.on('line', (line) => {
      if (!line.trim() || line.startsWith('firstname')) {
        return; // Skip empty lines and header
      }


      const [firstname, lastname, age, field] = line.split(',');

      if (!firstname || !field) {
        return; // Skip invalid rows
      }


      students.push({ firstname, field });


      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });


    rl.on('close', () => {
      console.log(`Number of students: ${students.length}`);
      Object.keys(fields).forEach((field) => {
        console.log(
          `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
        );
      });
      resolve();
    });


    rl.on('error', () => {
      reject(new Error('Cannot load the database'));
    });
  });
});


module.exports = countStudents;
