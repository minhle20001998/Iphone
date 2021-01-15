import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    withRouter
} from "react-router-dom";
import Statusbar from '../../Statusbar/Statusbar'
import CaculatorStyle from './Caculator.css'

class Caculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirst: true,
            warning: "",
            firstNum: "",
            secondNum: "",
            operator: "",
            result: "",
            display: ""
        }
        this.caculate = this.caculate.bind(this);
    }

    caculate() {
        const { firstNum, secondNum, operator } = this.state;
        let result = 0;
        if (operator != "") {
            switch (operator) {
                case "add":
                    result = (parseFloat(firstNum) + parseFloat(secondNum)).toPrecision(2);
                    console.log("add")
                    break;
                case "subtract":
                    result = (parseFloat(firstNum) - parseFloat(secondNum)).toPrecision(2);
                    console.log("sub")
                    break;
                case "multiply":
                    result = (parseFloat(firstNum) * parseFloat(secondNum)).toPrecision(5);
                    console.log("mul")
                    break;
                case "divide":
                    if (parseFloat(secondNum) != 0) {
                        result = (parseFloat(firstNum) / parseFloat(secondNum)).toPrecision(5);
                    } else {
                        result = "Divided by zero !!!"
                    }
                    break;
            }
            this.setState({
                isFirst: (result != "Divided by zero !!!") ? false : true,
                firstNum: (result != "Divided by zero !!!") ? result : "",
                secondNum: "",
                operator: "",
                result: (result != "Divided by zero !!!") ? result : "",
                display: result
            })
            console.log("caculated")
        }
    }

    handlePercentClick() {
        console.log("percent click")
        const { isFirst } = this.state;
        if (isFirst) {
            this.setState({
                firstNum: (parseFloat(this.state.firstNum) / 100).toPrecision(1),
                display: (parseFloat(this.state.firstNum) / 100).toPrecision(1)
            })
        } else {
            this.setState({
                secondNum: (parseFloat(this.state.secondNum) / 100).toPrecision(1),
                display: (parseFloat(this.state.secondNum) / 100).toPrecision(1)
            })
        }
    }

    handleNagativeClick() {
        if (this.state.firstNum || this.state.secondNum) {
            console.log("neg click")
            const { isFirst } = this.state;
            if (isFirst) {
                this.setState({
                    firstNum: (parseFloat(this.state.firstNum) * -1),
                    display: (parseFloat(this.state.firstNum) * -1)
                })
            } else {
                this.setState({
                    secondNum: (parseFloat(this.state.secondNum) * -1),
                    display: (parseFloat(this.state.secondNum) * -1)
                })
            }
        }
    }

    handleOperationClick(op) {
        const { firstNum, secondNum, operator } = this.state;
        if (operator.length == 0 && firstNum.length != 0) {
            this.setState({
                isFirst: false,
                operator: op
            })
        } else if (operator.length != 0 && firstNum.length != 0 && secondNum.length != 0) {
            this.caculate();
        } else {

        }
        console.log("op click")
    }

    handleNumClick(num) {
        const { firstNum, secondNum, isFirst } = this.state;

        if (isFirst) {
            if (num === "." && firstNum.toString().includes(".")) {
                return;
            }
        }
        if (isFirst === true && firstNum.toString().length <= 9) {
            console.log("f click")
            this.setState({
                firstNum: firstNum + num,
                display: firstNum + num
            })
        } else if (isFirst !== true && secondNum.toString().length <= 9) {
            console.log("sc click")
            this.setState({
                secondNum: secondNum + num,
                display: secondNum + num
            })
        }
    }

    clear() {
        this.setState({
            isFirst: true,
            firstNum: "",
            secondNum: "",
            operator: "",
            result: "",
            display: ""
        })
    }

    render() {
        return <>
            <Statusbar size="12px" />
            <div className="content">
                <div className="caculator-display">
                    <span className="result">{this.state.display}</span>
                </div>
                <div className="caculator-keys">
                    <button data-action="clear" onClick={() => { this.clear() }} className="special">AC</button>
                    <button onClick={() => { this.handleNagativeClick() }} className="special">+/-</button>
                    <button onClick={() => { this.handlePercentClick() }} className="special">%</button>
                    <button className="key--operator" data-action="divide" onClick={() => { this.handleOperationClick("divide") }}>÷</button>
                    <button onClick={() => { this.handleNumClick(7) }} className="number">7</button>
                    <button onClick={() => { this.handleNumClick(8) }} className="number">8</button>
                    <button onClick={() => { this.handleNumClick(9) }} className="number">9</button>
                    <button className="key--operator" data-action="multiply" onClick={() => { this.handleOperationClick("multiply") }}>&times;</button>
                    <button onClick={() => { this.handleNumClick(4) }} className="number">4</button>
                    <button onClick={() => { this.handleNumClick(5) }} className="number">5</button>
                    <button onClick={() => { this.handleNumClick(6) }} className="number">6</button>
                    <button className="key--operator" data-action="subtract" onClick={() => { this.handleOperationClick("subtract") }}>-</button>
                    <button onClick={() => { this.handleNumClick(1) }} className="number">1</button>
                    <button onClick={() => { this.handleNumClick(2) }} className="number">2</button>
                    <button onClick={() => { this.handleNumClick(3) }} className="number">3</button>
                    <button className="key--operator" data-action="add" onClick={() => { this.handleOperationClick("add") }}>+</button>
                    <button id="wide" onClick={() => { this.handleNumClick(0) }} className="number">0</button>
                    <button data-action="decimal" onClick={() => { this.handleNumClick(".") }} className="number">.</button>
                    <button className="key--operator" data-action="calculate" onClick={() => { this.caculate() }}>=</button>
                </div>
            </div>
        </>
    }
}

export default withRouter(Caculator);