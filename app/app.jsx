'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
require("./static/scss/style.scss");


import timsort from './components/timsort/timsort.ts';
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

    returnBefore() {
        let quickSortedArray = new quickSort();
        return quickSortedArray.getSorted(this.state.beforeArray, 0, this.state.beforeArray.length - 1, "id");
    }

    componentDidMount() {
        this.setState({
            afterArray: this.returnBefore()
        })
    }

    render() {
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
    }
}

render(<App/>, document.getElementById('app'));