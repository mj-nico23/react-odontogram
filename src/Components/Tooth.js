import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./Tooth.css";

const SIZE = 40;

class Tooth extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            isActive: false,
            ContextZone: "",
            Zones: {
                center: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }
    }

    onClick(zone, event) {
        let zones = this.state.Zones;
        zones[zone] = 1;
        this.setState({ Zones: zones });
    }

    handleClick(e, data, target) {
        let zones = this.state.Zones;
        zones[this.state.ContextZone] = 2;
        this.setState({ Zones: zones });
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
                <ContextMenu id={"ctx" + this.props.toothNumber} className="context-menu" >
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick.bind(this)} className="context-menu-item">
                        ContextMenu Item 1
                    </MenuItem>
                    <MenuItem data={{foo: 'bar2'}} onClick={this.handleClick.bind(this)} className="context-menu-item">
                        ContextMenu Item 2
                    </MenuItem>
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