import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateList from "./pages/CreateList";
import { ComposedListProvider } from "./util/ComposedListContext";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <React.Fragment>
      <ComposedListProvider>
        <CssBaseline />
        <NavBar />
        <div className="pageContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="compose" element={<CreateList />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>
      </ComposedListProvider>
    </React.Fragment>
  );
}

export default App;
