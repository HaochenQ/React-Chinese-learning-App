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
      toast("Error happened ;(");
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
      <div className="create-list">
        <Grid
          container
          direction="column"
          //justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h4"
              gutterBottom
              //style={{ textAlign: "center", marginTop: "20px" }}
            >
              Create Your New Word List
            </Typography>
          </Grid>

          <Grid item>
            {/* <Grid container spacing={47}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                //style={{ marginRight: "350px" }}
              >
                <ArrowBackIosIcon fontSize="medium" />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                <ArrowForwardIosIcon />
              </Button>
            </Grid>
          </Grid> */}
          </Grid>

          <br />
          <Grid item>
            <Stack
              component="form"
              sx={{
                m: "auto",
                width: "50ch",
              }}
              //   justifyContent="center"
              //   alignItems="center"
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Word in Chinese"
                id="name"
                name="name"
                value={wordName}
                onChange={handleChange}
                //defaultValue="Small"
                //variant="filled"
                //size="small"
              />
              <TextField
                label="Part of Speech"
                id="grammar"
                name="grammar"
                value={grammar}
                onChange={handleChange}
                //defaultValue="Normal"
                //variant="filled"
              />
              <TextField
                label="Pinyin"
                id="pinyin"
                name="pinyin"
                value={pinyin}
                onChange={handleChange}
                //defaultValue="Normal"
                //variant="filled"
              />
              <TextField
                label="Translation"
                id="definition"
                name="definition"
                value={definition}
                onChange={handleChange}
                //defaultValue="Normal"
                //variant="filled"
              />
              <Tooltip title="Save the current word and add next one!">
                <Button
                  variant="contained"
                  //type="submit"
                  onClick={(e) => onAdd(e)}
                >
                  Save the Word into the List
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
          <br />
          <Grid
            container
            direction={"row"}
            sx={{
              m: "auto",
              width: "50ch",
            }}
            justifyContent="space-between"
          >
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
                  Save to List
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
              once again!
            </Alert>
          </Grid>
        </Grid>
      </div>
      <div className="fab">
        {list.length ? (
          <Fab variant="extended" color="info" size="medium">
            {list.length} word(s) in the current list
          </Fab>
        ) : null}
      </div>
    </React.Fragment>
  );
}
