import * as React from "react";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import data from "./data/input.json";
import "./App.css";
import { Button } from "@mui/material";
import ContrlledSwitch from "./components/ControlledSwitch";
import wordsShuffle from "./util/shuffle";

function App() {
  let word;
  let len;

  const [current, setCurrent] = React.useState(0);
  const [files, setFiles] = React.useState("");
  const [shuffle, setShuffle] = React.useState(false);
  //an array to store indexs of shuffled words
  const [shuffledQueue, setShuffledQueue] = React.useState([]);
  //the initial value set to 1 so the first shuffled word won't show twice
  //as
  const [shuffleIndex, setShuffleIndex] = React.useState(1);
  const [checked, setChecked] = React.useState(false);
  files ? (word = JSON.parse(files)[current]) : (word = data[current]);
  files ? (len = JSON.parse(files).length) : (len = data.length);

  React.useEffect(() => {
    if (shuffledQueue.length === len) {
      setCurrent(shuffledQueue[0]);
    }
  }, [shuffledQueue, len, files, checked]);

  // show the next word
  const next = () => {
    if (shuffle) {
      console.log("shuffled next");
      console.log(shuffleIndex);
      console.log(shuffledQueue);
      if (shuffleIndex < len) {
        setCurrent(shuffledQueue[shuffleIndex]);
        setShuffleIndex(shuffleIndex + 1);
      } else {
        alert("No more new words!");
        setShuffleIndex(shuffleIndex - 2);
      }
    } else {
      return current < len - 1 ? setCurrent(current + 1) : setCurrent(0);
    }
  };

  //show the previous word
  const previous = () => {
    if (shuffle) {
      if (shuffleIndex >= 0) {
        setCurrent(shuffledQueue[shuffleIndex]);
        setShuffleIndex(shuffleIndex - 1);
      } else {
        alert("All words are reviewed!");
        setShuffleIndex(shuffleIndex + 2);
      }
    } else {
      current > 0 ? setCurrent(current - 1) : setCurrent(len - 1);
    }
  };

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(e.target.result);
      //setShuffledQueue(wordsShuffle(Array.from(Array(len).keys())));
      switchOff();
    };
  };

  const handleSwitchChange = (e) => {
    setChecked(e.target.checked);
    console.log("switched!");
    setShuffle(e.target.checked);
    if (e.target.checked) {
      setShuffledQueue(wordsShuffle(Array.from(Array(len).keys())));
      setShuffleIndex(1);
    } else {
      setShuffledQueue(Array.from(Array(len).keys()));
    }
  };
  //switch off the switch
  const switchOff = () => {
    setChecked(false);
    setShuffle(false);
    setCurrent(0);
  };

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
            <ContrlledSwitch
              handleChange={handleSwitchChange}
              checked={checked}
            />
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
