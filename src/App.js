import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import data from "./data/input.json";
import "./App.css";
import { Button } from "@mui/material";
import UploadButtons from "./components/Upload";
import ContrlledSwitch from "./components/ControlledSwitch";
import wordsShuffle from "./util/shuffle";

function App() {
  const [current, setCurrent] = React.useState(0);
  const [files, setFiles] = React.useState("");
  const [shuffle, setShuffle] = React.useState(false);
  const [preArray, setPreArray] = React.useState([]);
  //const [len, setLen] = React.useState(data.length);
  //React.useEffect()

  //let [word, setWord] = React.useState(data[current]);
  let word;
  let len = data.length;

  //an array to store indexs of shuffled words
  const [shuffledQueue, setShuffledQueue] = React.useState(
    Array.from(Array(len).keys())
  );

  //get a random number but self
  const getRandom = (max) => {
    let number = Math.floor(Math.random() * max);
    return number === current ? getRandom(max) : number;
  };

  const next = () => {
    if (shuffle) {
      let random = getRandom(len);
      setCurrent(random);
      // if (shuffledQueue) {
      //   setCurrent()
      // }
    } else {
      return current < len - 1 ? setCurrent(current + 1) : setCurrent(0);
    }
  };

  const previous = () => {
    if (shuffle) {
      let random = getRandom(len);
      setCurrent(random);
    } else {
      current > 0 ? setCurrent(current - 1) : setCurrent(len - 1);
    }
  };

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      // console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
      setCurrent(0);
      //setLen(JSON.parse(files).length);
    };
  };

  const handleSwitchChange = (e) => {
    //console.log(e.target.checked);
    setShuffle(e.target.checked);
    setShuffledQueue(wordsShuffle(shuffledQueue));
  };
  //console.log(JSON.parse(files)[current]);
  files ? (word = JSON.parse(files)[current]) : (word = data[current]);
  //files ? setWord(JSON.parse(files)[current]) : setWord(data[current]);
  files ? (len = JSON.parse(files).length) : (len = data.length);

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* The rest of your application */}
      <NavBar />

      <div className="body">
        <div className="word-card">
          <div className="input-bar">
            <Button variant="contained">
              <input type="file" onChange={handleChange} />
            </Button>
            <ContrlledSwitch handleChange={handleSwitchChange} />
          </div>
          {/* <br /> */}
          {/* <UploadButtons />
          <br /> */}
          <br />
          <Card
            len={len}
            id={word.id}
            word={word.word}
            grammar={word.grammar}
            pinyin={word.pinyin}
            defination={word.defination}
            placeholder="Click to reveal the definition"
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
      </div>
    </React.Fragment>
  );
}

export default App;
