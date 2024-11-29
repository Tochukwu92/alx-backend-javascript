/* eslint-env node */
/* eslint strict: ["error", "global"] */


'use strict';


const fs = require('fs');


function countStudents(path){
    try{
        // Read file synchronously and remove leading & trailing whitespace
        const data = fs.readFileSync(path, 'utf-8').trim();

        // split the file into lines in an array
        const lines = data.split('\n');

        // skip the header and filter out empty lines
        const studentLines = lines.slice(1).filter((line) => line.trim() != '');

        // Parse student information into an array of objects
        const students = studentLines.map((line) => {
            const fields = line.split(',');
            return {
                firstname: fields[0],
                lastname: fields[1],
                age: parseInt(fields[2], 10),
                field: fields[3],
            };
        });

        // Log the total number of students
        const totalStudents = students.length;
        console.log(`Number of students: ${totalStudents}`);

        // Group students by their field of study
        const fieldGroups = {};
        students.forEach((student) => {
            if (!fieldGroups[student.field]) {
                fieldGroups[student.field] = [];
            }
            fieldGroups[student.field].push(student.firstname);
        });

        // Log the number of students in each field and their names
        Object.keys(fieldGroups).forEach((field) => {
            const names = fieldGroups[field];
            const studentCount = names.length;
            const nameList = names.join(', ');
            console.log(`Number of students in ${field}: ${studentCount}. List: ${nameList}`);
        });
    } catch (error) {
        // Handle errors if the file cannot be read
        throw new Error('Cannot load the database');
    }
}


module.exports = countStudents;
