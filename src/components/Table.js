import React, { useState } from 'react';
import students from './Student';

function Table() {
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortedStudents, setSortedStudents] = useState([...students]);
  const [sortOption, setSortOption] = useState('name'); // State to track current sorting option

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCommentsClick = (student) => {
    setSelectedStudent(student);
  };

  const handleSortBy = (option) => {
    let sortedData;
    if (option === 'name') {
      sortedData = [...sortedStudents].sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === 'department') {
      sortedData = [...sortedStudents].sort((a, b) => a.department.localeCompare(b.department));
    }
    setSortedStudents(sortedData);
    setSortOption(option); // Update current sorting option
  };

  const filteredStudents = sortedStudents.filter(student => {
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
      <button onClick={() => handleSortBy('name')}>Sort by Name</button> {/* Button to sort by name */}
      <button onClick={() => handleSortBy('department')}>Sort by Department</button> {/* Button to sort by department */}
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Department</th>
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
              <td>{student.department}</td> {/* Display department */}
              <td>{student.ticketNumber}</td>
              <td>{student.ratingGrade}</td>
              <td>{student.examGrade}</td>
              <td>{(0.6 * student.examGrade + 0.4 * student.ratingGrade).toFixed(2)}</td>
              <td>{(0.6 * student.examGrade + 0.4 * student.ratingGrade) >= 4 ? "Passed" : "Failed"}</td>
              <td><button onClick={() => handleCommentsClick(student)}>Comments</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div>
          <h2>Selected Student Comments:</h2>
          <p>{selectedStudent.comments}</p>
        </div>
      )}
    </div>
  );
}

export default Table;
