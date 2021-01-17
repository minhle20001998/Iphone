import Iphone from "./components/iphone/IPhone";
import React, { Component } from 'react'
import HomeScreen from "./components/screens/home-screen/HomeScreen"
import Caculator from "./components/screens/caculator-screen/Caculator"
import Music from "./components/screens/music-screen/Music"

import { Switch, Route, BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
class App extends Component {
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
    return (
      <div className="App">
        <BrowserRouter>
          <Switch >
            <Route exact path="/">
              <Iphone >
                {screens[current_screen]}
              </Iphone>
            </Route>
            <Route path="/caculator">
              <Iphone >
                <Caculator></Caculator>
              </Iphone>
            </Route>
            <Route path="/music">
              <Iphone >
                <Music></Music>
              </Iphone>
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
