import React, { Component } from 'react';
import "./Tooth.css";

const SIZE = 40;

class Tooth extends Component {

    onClick(zone, event) {
        this.props.onClick(zone);
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

        let getClassNamesByZone = (zone) => {
            return "";
        }

        return(
            <div style={{width: `${L}px`, visibility: this.props.hidden}} className="tooth-wrapper" id={this.props.id}>
                <svg width={L} height={L} className="tooth">
                    <rect
                        x={b}
                        y={b}
                        width={a}
                        height={a}
                        onClick={this.onClick.bind(this, 'center')}
                        className={getClassNamesByZone('center')}
                        />

                    <polygon
                        points={top}
                        onClick={this.onClick.bind(this, 'top')}
                        className={getClassNamesByZone('top')}
                        />

                    <polygon
                        points={left}
                        onClick={this.onClick.bind(this, 'left')}
                        className={getClassNamesByZone('left')}
                        />

                    <polygon
                        points={right}
                        onClick={this.onClick.bind(this, 'right')}
                        className={getClassNamesByZone('right')}
                        />

                    <polygon
                        points={bottom}
                        onClick={this.onClick.bind(this, 'bottom')}
                        className={getClassNamesByZone('bottom')}
                        />

                </svg>
                <span style={{width: `${L}px`, display: 'block', cursor: 'pointer', margin: '0 auto', textAlign: 'center', fontSize: '10pt'}}>
                    {this.props.toothNumber}
                </span>
            </div>
        );
    }
}

Tooth.defaultProps = {
    toothNumber: 0
}

export default Tooth;