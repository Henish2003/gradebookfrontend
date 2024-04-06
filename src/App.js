import React, { useState } from 'react';
import Header from './components/Header';
import MainBlock from './components/MainBlock';
import StatisticsBlock from './components/StatisticsBlock';
import Footer from './components/Footer';

function App() {
  
  const [showStatistics, setShowStatistics] = useState(false);

  return (
    <div className="App">
      <Header />
      <MainBlock />
      
      {showStatistics && <StatisticsBlock />}
      <button onClick={() => setShowStatistics(!showStatistics)}>
        {showStatistics ? "Hide Statistics" : "Show Statistics"}
      </button>
      <Footer />
    </div>
  );
}

export default App;