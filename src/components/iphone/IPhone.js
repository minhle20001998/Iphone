import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import IphoneStyle from "./IPhone.css";
class IPhone extends Component {

    render() {
        return <div className="Iphone">
            <div className="sensors">
                <div className="top">
                    <div className="light-sensor"></div>
                </div>
                <div className="bottom">
                    <div className="camera"></div>
                    <div className="ear-piece"></div>
                </div>
            </div>
            <div className="screen">
                {/* SCREEN */}
                {this.props.children}
            </div>
            <div className="button">
                <span className="home-key" onClick={() => { this.props.history.push("/") }} >

                </span>
            </div>
        </div>
    }
}

export default withRouter(IPhone);
