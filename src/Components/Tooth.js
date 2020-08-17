import React, { useState } from 'react';
import useContextMenu from 'contextmenu';
import 'contextmenu/ContextMenu.css';
import './Tooth.css';

function Tooth(props) {
    const clearState = {
        Zones: {
            center: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        Extract: 0,
        Crown: 0,
        Filter: 0,
        Fracture: 0
    };

    const [toothState, setToothState] = useState(
        {
            Zones: {
                center: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            Extract: 0,
            Crown: 0,
            Filter: 0,
            Fracture: 0
        }
    );

    const [contextMenu, useCM] = useContextMenu({ submenuSymbol: '>' });
    const translate = `translate(${props.positionX},${props.positionY})`;

    const subMenu = (a, z) => {
        return {
            'Caries': () => setToothState(prevState => ({
                ...prevState,
                Zones: {                   
                    ...prevState.Zones,  
                    center: z ?? 1       
                }
            })),
            'Caries All': () => console.log('caries all'),
            'Ausente': () => console.log('ausente'),
            'Corona': () => console.log('corona'),
        }
    }

    const menuConfig = (a) => {
        return {
            'Done': subMenu(a, 1),
            'To do': subMenu(a, 2),
            'JSX line': <hr></hr>,
            'Clear All': () => setToothState(clearState)
        }
    };

    let getClassNamesByZone = (zone) => {

        let classNames = [];

        if (toothState.Zones) {
            if (toothState.Zones[zone] === 1) {
                classNames.push('to-do');
            } else if (toothState.Zones[zone] === 2) {
                classNames.push('done');
            }
        }

        return classNames.join(' ');
    }

    return (
        <svg className="tooth">
            <g transform={translate}>
                <polygon
                    points="0,0 20,0 15,5 5,5"
                    onContextMenu={useCM(menuConfig(1))}
                    className={getClassNamesByZone('top')}
                />
                <polygon 
                    points="5,15 15,15 20,20 0,20"
                    onContextMenu={useCM(menuConfig(2))}
                    className={getClassNamesByZone('bottom')}
                />
                <polygon points="15,5 20,0 20,20 15,15"></polygon>
                <polygon points="0,0 5,5 5,15 0,20"></polygon>
                <polygon
                    points="5,5 15,5 15,15 5,15"
                    className={getClassNamesByZone('center')}
                />
                <text x="6" y="30" stroke="navy" fill="navy" strokeWidth="0.1" className="tooth"> {props.number} </text>
            </g>
            {contextMenu}
        </svg>
    )
}

export default Tooth;