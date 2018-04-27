import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from "react-contextmenu";
import "./Tooth.css";
import "./ContextMenu.css";


const SIZE = 40;

class Tooth extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            ContextZone: "",
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
    }

    onClick(zone, event) {
        let zones = this.state.Zones;
        zones[zone] = 1;
        this.setState({ Zones: zones });
    }

    handleClick(e, data, target) {
        // let zones = this.state.Zones;
        // zones[this.state.ContextZone] = 2;
        this.setState({ 
            Extract: data.Extract || this.state.Extract,
            Crown: data.Crown || this.state.Crown,
            Filter: data.Filter || data.Filter,
            Fracture: data.Fracture || this.state.Fracture
        });
    }

    contextMyMenu(zone) {
        this.setState({ ContextZone: zone });
    }

    render() {
        var L = SIZE;
        var a = L/2 - L/20;
        var b = (L - a)/2;

        // Template strings to define the path of the 4 poligons that define
        // 4 of 5 tooth sections
        var top = `${0},${0} ${b},${b} ${b+a},${b} ${L},${0}`;
        var left = `${0},${0} ${0},${L} ${b},${b+a} ${b},${b}`;
        var right = `${L},${0} ${b+a},${b} ${b+a},${b+a} ${L},${L}`;
        var bottom = `${0},${L} ${b},${b+a} ${b+a},${b+a} ${L},${L}`;

        let getClassNamesByZone = (stateZones, zone) => {

            let classNames = [];

            if (this.state.Zones){
                if (this.state.Zones[zone] === 1) {
                    classNames.push('to-do');
                } else if (this.state.Zones[zone] === 2){
                    classNames.push('done');
                }
            }

            return classNames.join(' ');
        }

        return(
            <div style={{width: `${L}px`, visibility: this.props.hidden}} className="tooth-wrapper" id={this.props.id}>
                <ContextMenu id={"ctx" + this.props.toothNumber}>
                    <SubMenu title='Hecho'>
                        <MenuItem onClick={this.handleClick.bind(this)}>Caries</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)}>Caries toda la pieza</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ Extract: 1}}>Ausente</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ Crown: 1}}>Corona</MenuItem>
                    </SubMenu>
                    <SubMenu title='Hacer'>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ Caries: 2}}>Caries</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ CariesFull: 2}}>Caries toda la pieza</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ Extract: 2}} >Extracción</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ Crown: 2}}>Corona</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ Filter: 2}}>Filtrado</MenuItem>
                        <MenuItem onClick={this.handleClick.bind(this)} data={{ Fracture: 2}}>Fractura</MenuItem>
                    </SubMenu>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleClick.bind(this)}>Borrar Todo</MenuItem>
                </ContextMenu>
                <ContextMenuTrigger id={"ctx" + this.props.toothNumber}>
                    <svg width={L} height={L} className="tooth">
                        <rect
                            x={b}
                            y={b}
                            width={a}
                            height={a}
                            onClick={this.onClick.bind(this, 'center')}
                            className={getClassNamesByZone(this.state.Zones, 'center')}
                            onContextMenu={this.contextMyMenu.bind(this, 'center')}
                            />
                            
                        <polygon
                            points={top}
                            onClick={this.onClick.bind(this, 'top')}
                            className={getClassNamesByZone(this.state.Zones, 'top')}
                            onContextMenu={this.contextMyMenu.bind(this, 'top')}
                            />

                        <polygon
                            points={left}
                            onClick={this.onClick.bind(this, 'left')}
                            className={getClassNamesByZone(this.state.Zones, 'left')}
                            onContextMenu={this.contextMyMenu.bind(this, 'left')}
                            />

                        <polygon
                            points={right}
                            onClick={this.onClick.bind(this, 'right')}
                            className={getClassNamesByZone(this.state.Zones, 'right')}
                            onContextMenu={this.contextMyMenu.bind(this, 'right')}
                            />

                        <polygon
                            points={bottom}
                            onClick={this.onClick.bind(this, 'bottom')}
                            className={getClassNamesByZone(this.state.Zones, 'bottom')}
                            onContextMenu={this.contextMyMenu.bind(this, 'bottom')}
                            />

                        { this.state.Extract && this.state.Extract > 0 && 
                            <g stroke={this.state.Extract === 1 ? "red" : "blue"}>
                                <line x1="0" y1="0" x2={L} y2={L} strokeWidth="3" />
                                <line x1="0" y1={L} x2={L} y2="0" strokeWidth="3" />
                            </g>
                        }

                        { this.state.Crown && this.state.Crown > 0 && 
                            <circle 
                                cx={L/2} 
                                cy={L/2} r={L/2} 
                                fill="none" 
                                stroke={this.state.Crown === 1 ? "red" : "blue"} 
                                strokeWidth="3"  
                            />
                        }

                        { this.state.Filter && this.state.Filter > 0 && 
                            <g stroke={this.state.Filter === 1 ? "red" : "blue"}>
                                <line x1="0" y1={L} x2={L} y2="0" strokeWidth="3" />
                            </g>
                        }

                        { this.state.Fracture && this.state.Fracture > 0 && 
                            <g stroke={this.state.Fracture === 1 ? "red" : "blue"}>
                                <line x1="0" y1={L/2} x2={L} y2={L/2} strokeWidth="3" />
                            </g>
                        }

                    </svg>
                </ContextMenuTrigger>
                <span style={{width: `${L}px`, display: 'block', cursor: 'pointer', margin: '0 auto', textAlign: 'center', fontSize: '10pt'}}>
                    {this.props.toothNumber}
                </span>
            </div>
        );
    }
}

Tooth.defaultProps = {
    toothNumber: 0,
    onClick: function() {},
    markedZones: []
}

export default Tooth;