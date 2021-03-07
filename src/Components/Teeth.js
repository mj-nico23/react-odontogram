import React from 'react';
import Tooth from './Tooth';

function Teeth({ start, end, x, y, handleChange }) {
    let tooths = getArray(start, end);

    return (
        <g transform="scale(1.4)" id="gmain">
            {
                tooths.map((i) =>
                    <Tooth onChange={handleChange}
                        key={i}
                        number={i}
                        positionY={y}
                        positionX={Math.abs((i - start) * 25) + x}
                    />
                )
            }
        </g>
    )
}

function getArray(start, end) {
    if (start > end) return getInverseArray(start, end);

    let list = [];
    for (var i = start; i <= end; i++) {
        list.push(i);
    }

    return list;
}

function getInverseArray(start, end) {
    let list = [];

    for (var i = start; i >= end; i--) {
        list.push(i);
    }

    return list;
}

export default Teeth;