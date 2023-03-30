import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

export default function BasicCard({
  ENmode,
  len,
  id = 1,
  word = "示例词语",
  grammar = "noun",
  pinyin = "shì lì",
  definition = "This is the example definition",
  placeholder = "Translation",
  placeholderPinyin = "PININ",
  placeholderChinese = "Chinese",
}) {
  const [CNdisplay, setCNdisplay] = React.useState(placeholderChinese);
  const [meaning, setMeaning] = React.useState(placeholder);
  const [pinyindisplay, setPinyindisplay] = React.useState(placeholderPinyin);
  const wholeCard = React.useRef(null);

  console.log(ENmode);
  React.useEffect(() => {
    setMeaning(placeholder);
    setPinyindisplay(placeholderPinyin);
    setCNdisplay(placeholderChinese);
    wholeCard.current.focus();
  }, [id]);

  const handleKeyDown = (e) => {
    //console.log(e);
    //alert(e.keyCode);
    //c
    if (e.keyCode === 67) {
      setCNdisplay(word);
    }
    //p
    if (e.keyCode === 80) {
      setPinyindisplay(pinyin);
    }
    //d
    if (e.keyCode === 84) {
      setMeaning(definition);
    }
    //t
    if (e.keyCode === 77) {
      window.open(
        `https://translate.google.com/?sl=zh-CN&tl=en&text=${word}&op=translate`
      );
    }
  };

  return (
    <Card
    //sx={{ minWidth: 275 }}
    >
      <div onKeyDown={(e) => handleKeyDown(e)} tabIndex="-1" ref={wholeCard}>
        <CardContent>
          {ENmode ? (
            <>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                No. {id}/{len}
              </Typography>
              <Tooltip title="Press [C] to reveal Chinese">
                <Typography
                  sx={{ typography: { md: "h2", sm: "h3", xs: "h3" } }}
                  onClick={() => {
                    setCNdisplay(word);
                  }}
                >
                  {CNdisplay}
                  <br />
                  {/* {'"a benevolent smile"'} */}
                </Typography>
              </Tooltip>

              <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="h6">
                {grammar}
              </Typography>
              <Tooltip title="Press [P] to reveal pinyin">
                <Typography
                  // sx={{ mb: 1.5 }}
                  sx={{ typography: { md: "h4", sm: "h4", xs: "h5" } }}
                  color="text.secondary"
                  onClick={() => {
                    setPinyindisplay(pinyin);
                  }}
                >
                  {pinyindisplay}
                </Typography>
              </Tooltip>
              <Typography
                sx={{ typography: { sm: "h4", xs: "h5" } }}
                component="div"
              >
                {definition}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                No. {id}/{len}
              </Typography>
              <Typography
                sx={{ typography: { md: "h2", sm: "h3", xs: "h3" } }}
                component="div"
              >
                {word}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="h6">
                {grammar}
              </Typography>
              <Tooltip title="Press [P] to reveal pinyin">
                <Typography
                  //  sx={{ mb: 1.5 }}
                  sx={{ typography: { sm: "h4", xs: "h5" } }}
                  color="text.secondary"
                  onClick={() => {
                    setPinyindisplay(pinyin);
                  }}
                >
                  {pinyindisplay}
                </Typography>
              </Tooltip>
              <Tooltip title="Press [T] to reveal translation">
                <Typography
                  sx={{ typography: { sm: "h4", xs: "h5" } }}
                  onClick={() => {
                    setMeaning(definition);
                  }}
                >
                  {meaning}
                  <br />
                  {/* {'"a benevolent smile"'} */}
                </Typography>
              </Tooltip>
            </>
          )}
        </CardContent>
        <CardActions>
          <Tooltip title="Press [M] to Google Translate">
            <Button
              size="small"
              onClick={() => {
                window.open(
                  `https://translate.google.com/?sl=zh-CN&tl=en&text=${word}&op=translate`
                );
              }}
            >
              Learn More in Google Translate
            </Button>
          </Tooltip>
        </CardActions>
      </div>
    </Card>
  );
}
