import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import data from "./data/input.json";
import "./App.css";
import { Button } from "@mui/material";
import UploadButtons from "./components/Upload";

function App() {
  const [current, setCurrent] = React.useState(0);
  let [word, setWord] = React.useState(data[current]);

  const next = () =>
    current < data.length - 1 ? setCurrent(current + 1) : null;
  const previous = () => (current > 0 ? setCurrent(current - 1) : null);

  const [files, setFiles] = React.useState("");

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
      setCurrent(0);
    };
  };
  files ? (word = JSON.parse(files)[current]) : (word = data[current]);
  // if (files) {
  //   setWord(JSON.parse(files)[current]);
  // }

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* The rest of your application */}
      <NavBar />
      <body>
        <div className="word-card">
          <Button variant="contained">
            <input type="file" onChange={handleChange} />
          </Button>
          <br />
          {/* <UploadButtons />
          <br /> */}
          <br />
          <Card
            len={data.length}
            id={word.id}
            word={word.word}
            grammar={word.grammar}
            defination={word.defination}
            placeholder="Click to reveal the defination"
          />
          <div className="buttons">
            <Button variant="contained" color="success" onClick={previous}>
              Previous
            </Button>
            <Button variant="contained" color="success" onClick={next}>
              Next
            </Button>
          </div>
        </div>
      </body>
    </React.Fragment>
  );
}

export default App;
