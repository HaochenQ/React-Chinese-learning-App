import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateList from "./pages/CreateList";
import { ComposedListProvider } from "./util/ComposedListContext";

function App() {
  return (
    <React.Fragment>
      <ComposedListProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="compose" element={<CreateList />} />
          <Route path="about" element={<About />} />
        </Routes>
      </ComposedListProvider>
    </React.Fragment>
  );
}

export default App;
