import * as React from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Home />
      <NavBar />
    </React.Fragment>
  );
}

export default App;
