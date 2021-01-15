import React, { Component } from 'react';
import IphoneStyle from "./IPhone.css";
import HomeScreen from "../screens/home-screen/HomeScreen"
class IPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_screen: 0,
            screens: {
                0: <HomeScreen></HomeScreen>
            }
        }
    }
    render() {
        const { screens, current_screen } = this.state;
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
                {screens[current_screen]}
            </div>
            <div className="button">
                <span className="home-key" ></span>
            </div>
        </div>
    }
}

export default IPhone;
