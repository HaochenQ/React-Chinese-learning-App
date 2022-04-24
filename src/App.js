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
  const [files, setFiles] = React.useState("");

  let [word, setWord] = React.useState(data[current]);

  const next = () =>
    current < data.length - 1 ? setCurrent(current + 1) : setCurrent(0);
  const previous = () =>
    current > 0 ? setCurrent(current - 1) : setCurrent(5);

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      // console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
      setCurrent(0);
    };
  };
  files ? (word = JSON.parse(files)[current]) : (word = data[current]);

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
            pinyin={word.pinyin}
            defination={word.defination}
            placeholder="Click to reveal the defination"
            placeholderPinyin="Click to reveal pinyin"
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
