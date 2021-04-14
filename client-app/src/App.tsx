import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import NavBar from "./Components/NavBar";
import NetworkPage from "./Pages/Network/NetworkPage";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/network/:id" component={NetworkPage} />
      </Switch>
    </>
  );
}

export default App;
