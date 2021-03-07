import React from 'react';
import './Odontogram.css';
import Teeth from './Teeth';

function Odontogram() {

  let odontogramState = {};

  const handleToothUpdate = (id, toothState) => {
    odontogramState[id] = toothState;
  };

  return (
    <div className="Odontogram">
      <svg version="1.1" height="100%" width="100%" >
        <Teeth start={18} end={11} x={0} y={0} handleChange={handleToothUpdate} />
        <Teeth start={21} end={28} x={210} y={0} handleChange={handleToothUpdate} />

        <Teeth start={55} end={51} x={75} y={40} handleChange={handleToothUpdate} />
        <Teeth start={61} end={65} x={210} y={40} handleChange={handleToothUpdate} />

        <Teeth start={85} end={81} x={75} y={80} handleChange={handleToothUpdate} />
        <Teeth start={71} end={75} x={210} y={80} handleChange={handleToothUpdate} />

        <Teeth start={48} end={41} x={0} y={120} handleChange={handleToothUpdate} />
        <Teeth start={31} end={38} x={210} y={120} handleChange={handleToothUpdate} />
      </svg>
    </div>
  );
}

export default Odontogram;