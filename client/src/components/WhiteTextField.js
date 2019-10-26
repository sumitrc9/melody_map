import React from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { width } from "@material-ui/system";

const useStyles = makeStyles({
  underline: {
    // normal style
    "&::before": {
      borderBottom: "1px solid white",
      width: '300px'
    },
    // hover style
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid white",
      width: '300px'
    },
    // focus style
    "&::after": {
      borderBottom: "1px solid white",
      width: '300px'
    }
  }
});
const WhiteTextField = () => {
  const classes = useStyles();
  return (
    <TextField InputProps={{ className: classes.underline }} />
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default WhiteTextField