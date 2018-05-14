import React, { Component } from 'react';
import Tooth from "./Components/Tooth";
import './App.css';

const hidd = [1, 2, 3]

const left = [
    [18, 17, 16, 15, 14, 13, 12, 11],
    [55, 54, 53, 52, 51],
    [85, 84, 83, 82, 81],
    [48, 47, 46, 45, 44, 43, 42, 41]
]

const right = [
    [21, 22, 23, 24, 25, 26, 27, 28],
    [61, 62, 63, 64, 65],
    [71, 72, 73, 74, 75],
    [31, 32, 33, 34, 35, 36, 37, 38]
]

class App extends Component {
    submit() {
        left.map((left_i, index) => {
            return left_i.map((toothNumber, index) => {
                return console.log(this.refs["tooth-" + toothNumber].state);   
            });
        });
    }

    render() {

        var rowCreator = (row) => {
            return row.map((toothNumber, index) => {
                return (
                    <Tooth key={toothNumber} toothNumber={toothNumber} ref={"tooth-" + toothNumber} />
                )
            })
        }

        var hiddenToothCreator = () => {
            return hidd.map((toothNumber, index) => {
                return (
                    <Tooth hidden="hidden" key={`hid_${toothNumber}`} />
                )
            })
        }


        return (
            <div className="row odontogram">
                <div className="col-sm-5 flex-container">

                    {
                        left.map((left_i, index) => {
                            return (
                                <div className="row" key={`left_row ${index}`}>
                                    <div className="col-xs-12 flex-container-right" key={`left_odontogram_row ${index}`}>
                                        {left_i.length === 5 ? hiddenToothCreator() : ""}
                                        {

                                            rowCreator(left_i)
                                        }
                                        <br />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="col-sm-5 flex-container">

                    {
                        right.map((right_i, index) => {
                            return (
                                <div className="row" key={`right_row ${index}`}>
                                    <div className="col-xs-12 flex-container-left" key={`right_odontogram_row ${index}`}>
                                        {
                                            rowCreator(right_i)
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <button onClick={this.submit.bind(this)}>submit</button>
            </div>
        );
    }
}

export default App;
