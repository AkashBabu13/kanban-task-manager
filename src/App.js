import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskBoard from './TaskBoard.js';

function App() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<TaskBoard />);
  return (
    <div className="App">

    </div>
  );
}

export default App;
