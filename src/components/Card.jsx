import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard({
  len,
  id = 1,
  word = "示例词语",
  grammar = "noun",
  pinyin = "shì lì",
  defination = "This is the example defination",
  placeholder,
  placeholderPinyin = "PININ",
}) {
  const [meaning, setMeaning] = React.useState(placeholder);
  const [pinyindisplay, setPinyindisplay] = React.useState(placeholderPinyin);

  React.useEffect(() => {
    setMeaning(placeholder);
    setPinyindisplay(placeholderPinyin);
  }, [id]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          No. {id}/{len}
        </Typography>
        <Typography variant="h1" component="div">
          {word}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="h6">
          {grammar}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          variant="h4"
          color="text.secondary"
          onClick={() => {
            setPinyindisplay(pinyin);
          }}
        >
          {pinyindisplay}
        </Typography>
        <Typography
          variant="h3"
          onClick={() => {
            setMeaning(defination);
          }}
        >
          {meaning}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            window.open(
              `https://translate.google.com/?sl=zh-CN&tl=en&text=${word}&op=translate`
            );
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
