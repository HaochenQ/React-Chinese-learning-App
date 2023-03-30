import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const JString = [
    {
      id: 1,
      word: "苹果",
      grammar: "noun",
      pinyin: "píng guǒ",
      definition: "Apple",
    },
    {
      id: 2,
      word: "猫",
      grammar: "noun",
      pinyin: "māo",
      definition: "Cat",
    },
    {
      id: 3,
      word: "唱歌",
      grammar: "verb",
      pinyin: "chàng gē",
      definition: "Sing",
    },
  ];
  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        //sx={{ mx: "1vw" }}
        style={{ minHeight: "80vh" }}
      >
        <Grid item style={{ paddingTop: "3%" }}>
          <Typography variant="h3" gutterBottom>
            About
          </Typography>
        </Grid>
        <Grid item style={{ paddingBottom: "3%" }}>
          <Typography variant="h6">
            This is a Chinese learning site where you can upload your own word
            list or create one <Link to="/compose">here</Link>.
          </Typography>
          <Typography variant="h6">
            A sample JSON file looks like this: <span> </span>
          </Typography>
          <Typography component={"span"}>
            <pre>{JSON.stringify(JString, null, 2)}</pre>
          </Typography>
          <Typography variant="h6">
            You can click or press "P" to show Pinyin, and click or press "D" to
            show the definition.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
