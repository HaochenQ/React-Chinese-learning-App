import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const JString = [
    {
      id: 1,
      word: "示例1",
      grammar: "noun",
      pinyin: "shì lì",
      definition: "Example1",
    },
    {
      id: 2,
      word: "示例2",
      grammar: "noun",
      pinyin: "shì lì",
      definition: "Example2",
    },
  ];
  return (
    <div className="about-card">
      <Grid
        container
        direction={"column"}
        display="flex"
        //justifyContent={"center"}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3" gutterBottom>
            About
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            This is a Chinese learning site where you can upload your own words
            list or create <Link to="/compose">here</Link>.
          </Typography>
          <Typography variant="h6">
            The sample JSON file looks like: <span> </span>
          </Typography>
          <Typography component={"span"}>
            <pre>{JSON.stringify(JString, null, 2)}</pre>
          </Typography>
          <Typography variant="h6">
            You can click or press "P" to show Pinyin, click or press "D" to
            show the definition.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
