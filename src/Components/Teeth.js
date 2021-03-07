import React from 'react';
import Tooth from './Tooth';

function Teeth(props) {
    let tooths = getArray(props.start, props.end);

    const handleToothUpdate = (toothState) => {
        console.log(toothState);
    };


    return (
        <g transform="scale(1.4)" id="gmain">
            {
                tooths.map((i) =>
                    <Tooth onChange={handleToothUpdate}
                        key={i}
                        number={i}
                        positionY={props.y}
                        positionX={Math.abs((i - props.start) * 25) + props.x}
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