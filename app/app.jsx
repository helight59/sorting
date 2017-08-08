'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
require("./static/scss/style.scss");


import sortBy from 'lodash/sortBy';

//import { javaSort.TimSort } from './components/timsort/java_timsort.ts';

import testArray from './testArray';
//import TimSort from "./components/timsort/java_timsort";
import quickSort from "./components/quickSort/quickSort";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            beforeArray: testArray(),
            afterArray: [],
        };
    }

    returnAfter() {

        let qSortArray = new quickSort();

        let t0 = performance.now();

        let result = qSortArray.getSorted(this.state.beforeArray, "id");

        let t1 = performance.now();
        console.log('Took', (t1 - t0).toFixed(4), 'ms with CUSTOM:', result);
    }

    componentDidMount() {
        this.setState({
            afterArray: this.returnAfter()
        })
    }

    render() {
        return <div>
            <p>start</p>
        </div>
    }

    /*render() {
        let renderForAfret = () => {
            if (this.state.afterArray.length > 0) {

                return this.state.afterArray.map((value, i) => {
                    return(
                        <p key={i}>
                            <span className="array-item">id: {value.id}</span>
                            <span className="array-item">first_name: "{value.first_name}"</span>
                            <span className="array-item">last_name: "{value.last_name}"</span>
                            <span className="array-item">email: "{value.email}"</span>
                            <span className="array-item">gender: "{value.gender}"</span>
                            <span className="array-item">ip_address: {value.ip_address}</span>
                        </p>
                    )
                })

            } else {
                return <p>Loading...</p>
            }
        };

        return (
            <div className="before-after">
                <div className="before full-array">
                    {this.state.beforeArray.map((value, i) => {
                        return(
                            <p key={i}>
                                <span className="array-item">id: {value.id}</span>
                                <span className="array-item">first_name: "{value.first_name}"</span>
                                <span className="array-item">last_name: "{value.last_name}"</span>
                                <span className="array-item">email: "{value.email}"</span>
                                <span className="array-item">gender: "{value.gender}"</span>
                                <span className="array-item">ip_address: {value.ip_address}</span>
                            </p>
                        )}
                    )}
                </div>

                <div className="after full-array">
                    {renderForAfret()}
                </div>
            </div>
        );
    }*/


}

render(<App/>, document.getElementById('app'));