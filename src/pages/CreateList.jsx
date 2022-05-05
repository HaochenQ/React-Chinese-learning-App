import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Stack,
  Grid,
  Button,
  Tooltip,
  Alert,
  Fab,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ComposedListContext } from "../util/ComposedListContext";

export default function CreateList() {
  const [index, setIndex] = useState(1);
  const [wordName, setWordName] = useState("");
  const [grammar, setGrammar] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [definition, setDefinition] = useState("");
  let [list, setList] = useContext(ComposedListContext);
  //programmatically navigate with react router
  const navigate = useNavigate();

  const handleNewList = () => {
    if (list.length === 0) {
      toast("No word in the list, add some before learning!");
    } else {
      navigate("/");
      //setList([]);
    }
  };
  const onAdd = () => {
    try {
      if (wordName && grammar && pinyin && definition) {
        list.push({
          id: index,
          word: wordName,
          grammar: grammar,
          pinyin: pinyin,
          definition: definition,
        });
        setList(list);
        setIndex(index + 1);
        console.log(list);
        setWordName("");
        setGrammar("");
        setPinyin("");
        setDefinition("");
        toast.success(
          `Successfully added a new word! You have ${list.length} word(s) now.`
        );
      } else {
        toast.error(`Please fill in all fields before go to next word!`);
      }
    } catch (error) {
      toast.error("Error happened ;(");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    if (name === "name") {
      setWordName(value);
    } else if (name === "grammar") {
      setGrammar(value);
    } else if (name === "definition") {
      setDefinition(value);
    } else if (name === "pinyin") {
      setPinyin(value);
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item>
          <Typography
            variant="h4"
            gutterBottom
            //style={{ textAlign: "center", marginTop: "20px" }}
          >
            Create a New Word List
          </Typography>
        </Grid>

        <br />
        <Grid item>
          <Grid
            container
            direction={"column"}
            justifyContent="center"
            //flexGrow={1}
            spacing={2}
            //minWidth={"50vh"}
          >
            <Grid item>
              <TextField
                label="Word in Chinese"
                id="name"
                name="name"
                value={wordName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>{" "}
            <Grid item>
              <TextField
                label="Part of Speech"
                id="grammar"
                name="grammar"
                value={grammar}
                onChange={handleChange}
                fullWidth
              />{" "}
            </Grid>
            <Grid item>
              <TextField
                label="Pinyin"
                id="pinyin"
                name="pinyin"
                value={pinyin}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Translation"
                id="definition"
                name="definition"
                value={definition}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Tooltip title="Save the current word and add next one!">
                <Button variant="contained" fullWidth onClick={(e) => onAdd(e)}>
                  Save the Word into the List
                </Button>
              </Tooltip>
            </Grid>
          </Grid>{" "}
          <br />{" "}
          <Grid container direction={"row"} justifyContent="space-between">
            <Grid item>
              {/* download the current list */}
              <Tooltip title="Download the current word list">
                <Button
                  variant="contained"
                  type="button"
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(list)
                  )}`}
                  download="wordList.json"
                >
                  Save the List
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Click to learn the word list you just created!">
                <Button variant="contained" onClick={handleNewList}>
                  Start Learning
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <br />
            <Alert severity="warning" variant="outlined">
              Please save your new list on Hard Drive if you'd like to use it
              once again !
            </Alert>
          </Grid>
        </Grid>

        <div className="fab">
          {list.length ? (
            <Fab variant="extended" color="info" size="medium">
              {list.length} word(s) in the current list
            </Fab>
          ) : null}
        </div>
      </Grid>
    </React.Fragment>
  );
}
