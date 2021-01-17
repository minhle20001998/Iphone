import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    withRouter
} from "react-router-dom";
import HomeScreenStyle from './HomeScreen.css';
import Statusbar from '../../Statusbar/Statusbar'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(route) {
        this.props.history.push(route);
    }

    render() {
        const { size, time } = this.state;
        return <div className="home-screen">
            <Statusbar size="12px" />
            <div className="apps">

            </div>
            <div className="dock">
                <div className="caculator-app" onClick={() => { this.handleRedirect('/caculator') }}>
                </div>
                <div className="camera-app">
                </div>
                <div className="music-app" onClick={() => { this.handleRedirect('/music') }}>
                </div>
                <div className="setting-app">
                </div>
            </div>
        </div>
    }
}

export default withRouter(HomeScreen);