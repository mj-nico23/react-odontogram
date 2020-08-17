import React from 'react';
import './App.css';
import Teeth from './Components/Teeth';

function App() {
  return (
    <div className="App">
      <svg version="1.1" height="100%" width="100%" >
        <Teeth start={18} end={11} x={0} y={0} />
        <Teeth start={21} end={28} x={210} y={0} />

        <Teeth start={55} end={51} x={75} y={40} />
        <Teeth start={61} end={65} x={210} y={40} />
        
        <Teeth start={85} end={81} x={75} y={80} />
        <Teeth start={71} end={75} x={210} y={80} />

        <Teeth start={48} end={41} x={0} y={120} />
        <Teeth start={31} end={38} x={210} y={120} />
      </svg>
    </div>
  );
}

export default App;
