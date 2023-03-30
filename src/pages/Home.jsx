import * as React from "react";
import Card from "../components/Card";
import data from "../data/input.json";
import { Button, Grid } from "@mui/material";
import ContrlledSwitch from "../components/ControlledSwitch";
import wordsShuffle from "../util/shuffle";
import { ComposedListContext } from "../util/ComposedListContext";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home() {
  let word;
  let len;
  const matches = useMediaQuery("(min-width:767px)");
  //current index in original word list
  const [current, setCurrent] = React.useState(0);
  const [files, setFiles] = React.useState("");
  const [fileName, setFileName] = React.useState(null);
  //const [composedList, setComposedList] = React.useState([]);
  const [shuffle, setShuffle] = React.useState(false);
  const [ENmode, setENMode] = React.useState(false);

  //an array to store indexs of shuffled words
  const [shuffledQueue, setShuffledQueue] = React.useState([]);

  //the initial value set to 1 so the first shuffled word won't show twice
  const [shuffleIndex, setShuffleIndex] = React.useState(1);
  const [checked, setChecked] = React.useState(false);

  const [modeChecked, setModeChecked] = React.useState(false);

  let [list, setList] = React.useContext(ComposedListContext);

  if (list.length !== 0) {
    word = list[current];
    len = list.length;
  } else {
    files ? (word = JSON.parse(files)[current]) : (word = data[current]);
    files ? (len = JSON.parse(files).length) : (len = data.length);
  }

  React.useEffect(() => {
    if (shuffledQueue.length === len) {
      setCurrent(shuffledQueue[0]);
    }
  }, [shuffledQueue, len, files, checked]);

  //   React.useEffect(() => {
  //     word = composedList[current];
  //     len = composedList.length;
  //   }, [composedList]);

  // show the next word
  const next = () => {
    if (shuffle) {
      console.log("shuffled next");
      console.log(shuffleIndex);
      console.log(shuffledQueue);
      if (shuffleIndex < len - 1) {
        setCurrent(shuffledQueue[shuffleIndex]);
        setShuffleIndex(shuffleIndex + 1);
      } else if (
        shuffleIndex === len - 1 &&
        current !== shuffledQueue[shuffleIndex]
      ) {
        setCurrent(shuffledQueue[shuffleIndex]);
      } else {
        console.log(current);
        alert("No more new words!");
      }
    } else {
      return current < len - 1 ? setCurrent(current + 1) : setCurrent(0);
    }
  };

  //show the previous word
  const previous = () => {
    if (shuffle) {
      console.log("previous");
      console.log(current);
      if (shuffleIndex > 0) {
        console.log("bian");
        setCurrent(shuffledQueue[shuffleIndex - 1]);
        setShuffleIndex(shuffleIndex - 1);
      } else if (
        shuffleIndex === 0 &&
        current !== shuffledQueue[shuffleIndex]
      ) {
        setCurrent(shuffledQueue[shuffleIndex]);
        //setShuffleIndex(shuffleIndex + 2);
      } else {
        alert("All words are reviewed!");
      }
    } else {
      current > 0 ? setCurrent(current - 1) : setCurrent(len - 1);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);

    setFileName(e.target.files[0].name);
    const fileReader = new FileReader();
    //file name e.target.files[0].name
    //extension e.target.files[0].type
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(e.target.result);
      //setShuffledQueue(wordsShuffle(Array.from(Array(len).keys())));
      switchOff();
      setList([]);
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

  const handleModeChange = (e) => {
    setModeChecked(e.target.checked);
    setENMode(e.target.checked);
  };

  //switch off the switch
  const switchOff = () => {
    setChecked(false);
    setShuffle(false);
    setCurrent(0);
  };

  //handle composeing words
  //   const hanleComposedWords = (list) => {
  //     setComposedList(list);
  //   };

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        alignItems="center"
        // justifyContent="center"
        style={{ minHeight: "80vh", paddingTop: "2%" }}
      >
        <Grid item style={{ minWidth: "50vw", maxWidth: "500px" }}>
          <br />
          {/* <Grid item style={{ minWidth: "50vw" }}> */}
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Button variant="contained" component="label">
                {fileName ? (
                  fileName
                ) : (
                  <>
                    <FileUploadIcon />
                    &nbsp;Upload File
                  </>
                )}
                <input type="file" hidden onChange={handleChange} />
              </Button>
            </Grid>

            <Grid item>
              <ContrlledSwitch
                handleChange={handleSwitchChange}
                checked={checked}
                label="Shuffle"
              />
            </Grid>
            <Grid item>
              <ContrlledSwitch
                handleChange={handleModeChange}
                checked={modeChecked}
                label="EN to CN"
              />
            </Grid>
          </Grid>
          {/* </Grid> */}
          <br />
          <Card
            ENmode={ENmode}
            len={len}
            id={word.id}
            word={word.word}
            grammar={word.grammar}
            pinyin={word.pinyin}
            definition={word.definition}
            placeholder="Click to reveal the translation"
            placeholderPinyin="Click to reveal the pinyin"
            placeholderChinese="点击查看"
          />
          <br />
          <Grid item style={{ minWidth: "50vw" }}>
            <Grid container justifyContent={"space-between"} spacing={0}>
              <Grid item>
                <Button variant="contained" color="success" onClick={previous}>
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="success" onClick={next}>
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
