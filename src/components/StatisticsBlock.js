import React, { useState } from 'react';
import students from './Student';

function StatisticsBlock() {
  const [passPercentage, setPassPercentage] = useState(0);
  const [failPercentage, setFailPercentage] = useState(0);
  const [averageGrade, setAverageGrade] = useState(0);
  const [maxGrade, setMaxGrade] = useState(0);
  const [minGrade, setMinGrade] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const calculateStatistics = () => {
    let passCount = 0;
    let failCount = 0;
    let totalGrade = 0;
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;

    students.forEach(student => {
      const finalGrade = 0.6 * student.examGrade + 0.4 * student.ratingGrade;
      totalGrade += finalGrade;
      max = Math.max(max, finalGrade);
      min = Math.min(min, finalGrade);
      
      if (finalGrade >= 4) {
        passCount++;
      } else {
        failCount++;
      }
    });

    const totalStudents = students.length;
    const passPercentage = (passCount / totalStudents) * 100;
    const failPercentage = (failCount / totalStudents) * 100;
    const average = totalGrade / totalStudents;

    setPassPercentage(passPercentage.toFixed(2));
    setFailPercentage(failPercentage.toFixed(2));
    setAverageGrade(average.toFixed(2));
    setMaxGrade(max.toFixed(2));
    setMinGrade(min.toFixed(2));
  };

  const handleSearch = () => {
    const result = students.find(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResult(result);
  };

  return (
    <div>
      <button onClick={calculateStatistics}>Show Statistics</button>
      <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name" />
        <button onClick={handleSearch}>Search</button>
      </div>
      {passPercentage > 0 && failPercentage > 0 && (
        <div>
          <p>Average Pass Percentage: {passPercentage}%</p>
          <p>Average Fail Percentage: {failPercentage}%</p>
          <p>Average Grade: {averageGrade}</p>
          <p>Maximum Grade: {maxGrade}</p>
          <p>Minimum Grade: {minGrade}</p>
        </div>
      )}
      {searchResult && (
        <div>
          <h3>Search Result:</h3>
          <p>Name: {searchResult.name}</p>
          <p>Exam Grade: {searchResult.examGrade}</p>
          <p>Rating Grade: {searchResult.ratingGrade}</p>
          <p>Comments: {searchResult.comments}</p>
        </div>
      )}
    </div>
  );
}

export default StatisticsBlock;
