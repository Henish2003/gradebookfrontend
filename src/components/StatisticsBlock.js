// src/StatisticsBlock.js

import React, { useState } from 'react';
import students from './Student';

function StatisticsBlock() {
  const [passPercentage, setPassPercentage] = useState(0);
  const [failPercentage, setFailPercentage] = useState(0);

  const calculateStatistics = () => {
    let passCount = 0;
    let failCount = 0;

    students.forEach(student => {
      const finalGrade = 0.6 * student.examGrade + 0.4 * student.ratingGrade;
      if (finalGrade >= 4) {
        passCount++;
      } else {
        failCount++;
      }
    });

    const totalStudents = students.length;
    const passPercentage = (passCount / totalStudents) * 100;
    const failPercentage = (failCount / totalStudents) * 100;

    setPassPercentage(passPercentage.toFixed(2));
    setFailPercentage(failPercentage.toFixed(2));
  };

  return (
    <div>
      <button onClick={calculateStatistics}>Show Statistics</button>
      {passPercentage > 0 && failPercentage > 0 && (
        <div>
          <p>Average Pass Percentage: {passPercentage}%</p>
          <p>Average Fail Percentage: {failPercentage}%</p>
        </div>
      )}
    </div>
  );
}

export default StatisticsBlock;