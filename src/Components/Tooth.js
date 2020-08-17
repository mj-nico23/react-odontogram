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

    const [toothState, setToothState] = useState(clearState);
    const [contextMenu, useCM] = useContextMenu({ submenuSymbol: '>' });

    // Done SubMenu
    const doneSubMenu = (place, value) => {
        return {
            'Caries': () => setNewToothState('caries', place, value),
            'Caries All': () => setNewToothState('all', place, value),
            'Ausente': () => setNewToothState('ausente', place, value),
            'Corona': () => setNewToothState('corona', place, value),
        }
    }
    
    // Todo SubMenu
    const todoSubMenu = (place, value) => {
        return {
            'Caries': () => setNewToothState('caries', place, value),
            'Caries All': () => setNewToothState('all', place, value),
            'Ausente': () => setNewToothState('ausente', place, value),
            'Corona': () => setNewToothState('corona', place, value),
            'Filtrado': () => setNewToothState('filtrado', place, value),
            'Fracturado': () => setNewToothState('fracturado', place, value),
        }
    }

    // Main ContextMenu
    const menuConfig = (place) => {
        return {
            'Done': doneSubMenu(place, 1),
            'To do': todoSubMenu(place, 2),
            'JSX line': <hr></hr>,
            'Clear All': () => setNewToothState('clear'),
        }
    };

    let getClassNamesByZone = (zone) => {
        if (toothState.Zones) {
            if (toothState.Zones[zone] === 1) {
                return 'to-do';
            } else if (toothState.Zones[zone] === 2) {
                return 'done';
            }
        }

        return '';
    }

    // Tooth position
    const translate = `translate(${props.positionX},${props.positionY})`;

    return (
        <svg className="tooth">
            <g transform={translate}>
                <polygon
                    points="0,0 20,0 15,5 5,5"
                    onContextMenu={useCM(menuConfig('top'))}
                    className={getClassNamesByZone('top')}
                />
                <polygon
                    points="5,15 15,15 20,20 0,20"
                    onContextMenu={useCM(menuConfig('bottom'))}
                    className={getClassNamesByZone('bottom')}
                />
                <polygon
                    points="15,5 20,0 20,20 15,15"
                    onContextMenu={useCM(menuConfig('left'))}
                    className={getClassNamesByZone('left')}
                />
                <polygon
                    points="0,0 5,5 5,15 0,20"
                    onContextMenu={useCM(menuConfig('right'))}
                    className={getClassNamesByZone('right')}
                />
                <polygon
                    points="5,5 15,5 15,15 5,15"
                    onContextMenu={useCM(menuConfig('center'))}
                    className={getClassNamesByZone('center')}
                />
                {drawToothActions()}
                <text
                    x="6"
                    y="30"
                    stroke="navy"
                    fill="navy"
                    strokeWidth="0.1"
                    className="tooth">
                    {props.number}
                </text>
            </g>
            {contextMenu}
        </svg>
    )

    function setZones(prevState, zone, value) {
        prevState.Zones[zone] = value;
        return prevState.Zones;
    }

    function setNewToothState(action, zone, value){
        switch(action) {
            case "caries": {
                setToothState(currentState => ({
                    ...currentState,
                    Zones: setZones(currentState, zone, value)
                }));
                break;
            }
    
            case "all": {
                setToothState(currentState => ({
                    ...currentState,
                    Zones: {
                        center: value,
                        top: value,
                        bottom: value,
                        left: value,
                        right: value
                    }
                }));
                break;
            }
    
            case "ausente": {
                setToothState(currentState => ({
                    ...currentState,
                    Extract: value
                }));
                break;
            }
    
            case "corona": {
                setToothState(currentState => ({
                    ...currentState,
                    Crown: value
                }));
                break;
            }
    
            case "fracturado": {
                setToothState(currentState => ({
                    ...currentState,
                    Fracture: value
                }));
                break;
            }

            case "filtrado": {
                setToothState(currentState => ({
                    ...currentState,
                    Filter: value
                }));
                break;
            }
    
            case "clear": {
                setToothState(clearState);
                break;
            }
        }
    }

    function drawToothActions() {
        let otherFigures = null;
        if (toothState.Extract > 0) {
            otherFigures = <g stroke={toothState.Extract === 1 ? "red" : "blue"}>
                <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
                <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
            </g>
        }        
    
        if (toothState.Fracture > 0) {
            otherFigures = <g stroke={toothState.Fracture === 1 ? "red" : "blue"}>
                <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2"></line>
            </g>
        }

        if (toothState.Filter > 0) {
            otherFigures = <g stroke={toothState.Fracture === 1 ? "red" : "blue"}>
                <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
            </g>
        }
    
        if (toothState.Crown > 0) {
            otherFigures = <circle
                cx="10"
                cy="10" 
                r="10"
                fill="none"
                stroke={toothState.Crown === 1 ? "red" : "blue"}
                strokeWidth="2"
            />;
        }
        
        return otherFigures;
    }
}

export default Tooth;