import React, { Component } from 'react';
import HomeScreenStyle from './HomeScreen.css';
import Statusbar from '../../Statusbar/Statusbar'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { size, time } = this.state;
        return <div className="home-screen">
            <Statusbar size="12px" />
            <div className="apps">

            </div>
            <div className="dock">
                <div className="caculator-app">

                </div>
                <div className="camera-app">
                
                </div>
                <div className="note-app">
                
                </div>
                <div className="setting-app">
                
                </div>

            </div>
        </div>
    }
}

export default HomeScreen;