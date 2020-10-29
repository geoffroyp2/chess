import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const materialClasses = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    buttons: {},
    board: {
      width: 744,
      height: 744,
    },
    paper: {
      padding: theme.spacing(1),
    },
  };
});

export default materialClasses;
