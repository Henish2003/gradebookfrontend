// src/Table.js

import React, { useState } from 'react';
import students from './Student';

function Table() {
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null); // State to hold the selected student

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCommentsClick = (student) => {
    setSelectedStudent(student); // Set the selected student when Comments button is clicked
  };

  const filteredStudents = students.filter(student => {
    const finalGrade = 0.6 * student.examGrade + 0.4 * student.ratingGrade;
    if (filter === 'all') {
      return true;
    } else if (filter === 'pass') {
      return finalGrade >= 4;
    } else if (filter === 'fail') {
      return finalGrade < 4;
    }
    return true;
  });

  return (
    <div>
      <label>
        Filter by:
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Ticket's Number</th>
            <th>Rating Grade</th>
            <th>Exam Grade</th>
            <th>Final Grade</th>
            <th>Status</th>
            <th>Comments</th> 
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.ticketNumber}</td>
              <td>{student.ratingGrade}</td>
              <td>{student.examGrade}</td>
              <td>{(0.6 * student.examGrade + 0.4 * student.ratingGrade).toFixed(2)}</td>
              <td>{(0.6 * student.examGrade + 0.4 * student.ratingGrade) >= 4 ? "Passed" : "Failed"}</td>
              <td><button onClick={() => handleCommentsClick(student)}>Comments</button></td> {/* Changed event handler to handleCommentsClick */}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div>
          <h2>Selected Student Comments:</h2> {/* Updated heading */}
          <p>{selectedStudent.comments}</p> {/* Display comments */}
        </div>
      )}
    </div>
  );
}

export default Table;