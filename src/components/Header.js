import React from 'react';

function Header() {
  return (
    <header>
      <h1>Gradebook Project</h1>
      <p>Date: {new Date().toLocaleDateString()}</p>
      {/* Add more header information as needed */}
    </header>
  );
}

export default Header;