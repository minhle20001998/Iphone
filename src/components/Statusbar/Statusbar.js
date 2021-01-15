import React, { Component } from 'react'
import { IoIosAirplane } from "react-icons/io";
import { AiOutlineWifi } from "react-icons/ai";
import { BsBatteryHalf } from "react-icons/bs";
import { IconContext } from "react-icons";

import StatusbarStyle from "./Statusbar.css"

class Statusbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        }
    }
    toDateFormat(time) {
        let minutes = (time.getMinutes() / 10 < 1) ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
        let hours = (time.getHours() / 10 < 1) ? `0${time.getHours()}` : `${time.getHours()}`;
        return `${hours}:${minutes}`;
    }
    componentDidMount() {
        this.update = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.update);
    }
    render() {
        const { time } = this.state;
        const { size } = this.props;
        return <div className="status-bar">
            <div className="icons">
                <IconContext.Provider value={{ color: "white", className: "airplane", size: size }}>
                    <div>
                        <IoIosAirplane />
                    </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "white", className: "wifi", size: size }}>
                    <div>
                        <AiOutlineWifi />
                    </div>
                </IconContext.Provider>
            </div>
            <div className="time">
                {this.toDateFormat(time)}
            </div>
            <div className="function">
                <IconContext.Provider value={{ color: "white", className: "battery", size: "15px" }}>
                    <div className="battery">
                        <BsBatteryHalf />
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    }
}

export default Statusbar;
