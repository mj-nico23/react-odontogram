import React, { useEffect, useReducer, useRef } from 'react';
import useContextMenu from 'contextmenu';
import 'contextmenu/ContextMenu.css';
import './Tooth.css';

function Tooth({ number, positionX, positionY, onChange }) {
    const initialState = {
        Cavities: {
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

    function reducer(toothState, action) {
        switch (action.type) {
            case 'crown':
                return { ...toothState, Crown: action.value };
            case 'extract':
                return { ...toothState, Extract: action.value };
            case 'filter':
                return { ...toothState, Filter: action.value };
            case 'fracture':
                return { ...toothState, Fracture: action.value };
            case 'carie':
                return { ...toothState, Cavities: setCavities(toothState, action.zone, action.value) };
            case 'clear':
                return initialState;
            default:
                throw new Error();
        }
    }

    const crown = (val) => ({ type: "crown", value: val });
    const extract = (val) => ({ type: "extract", value: val });
    const filter = (val) => ({ type: "filter", value: val });
    const fracture = (val) => ({ type: "fracture", value: val });
    const carie = (z, val) => ({ type: "carie", value: val, zone: z });
    const clear = () => ({ type: "clear" });

    const [toothState, dispatch] = useReducer(reducer, initialState);
    const [contextMenu, useCM] = useContextMenu({ submenuSymbol: '>' });

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        onChange(number, toothState);
    }, [toothState, onChange, number]);

    // Done SubMenu
    const doneSubMenu = (place, value) => {
        return {
            'Cavity': () => {
                dispatch(carie(place, value));
            },
            'Cavities All': () => dispatch(carie('all', value)),
            'Absent': () => dispatch(extract(value)),
            'Crown': () => dispatch(crown(value)),
        }
    }

    // Todo SubMenu
    const todoSubMenu = (place, value) => {
        return {
            'Cavity': () => dispatch(carie(place, value)),
            'Cavities All': () => dispatch(carie('all', value)),
            'Absent': () => dispatch(extract(value)),
            'Crown': () => dispatch(crown(value)),
            'Filtered Out': () => dispatch(filter(value)),
            'Fractured': () => dispatch(fracture(value)),
        }
    }

    // Main ContextMenu
    const menuConfig = (place) => {
        return {
            'Done': doneSubMenu(place, 1),
            'To Do': todoSubMenu(place, 2),
            'JSX line': <hr></hr>,
            'Clear All': () => dispatch(clear()),
        }
    };

    let getClassNamesByZone = (zone) => {
        if (toothState.Cavities) {
            if (toothState.Cavities[zone] === 1) {
                return 'to-do';
            } else if (toothState.Cavities[zone] === 2) {
                return 'done';
            }
        }

        return '';
    }

    // Tooth position
    const translate = `translate(${positionX},${positionY})`;

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
                    {number}
                </text>
            </g>
            {contextMenu}
        </svg>
    )

    function setCavities(prevState, zone, value) {
        if (prevState && prevState.Cavities) {
            if (zone === "all") {
                prevState.Cavities =
                {
                    center: value,
                    top: value,
                    bottom: value,
                    left: value,
                    right: value
                }
            } else {
                prevState.Cavities[zone] = value;
            }

            return prevState.Cavities;
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