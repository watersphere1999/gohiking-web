import Comment from "../../components/Comment/Comment";
import React, { useState, useEffect, Fragment } from "react";
import {
  makeStyles,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import demoapi from "../../axios/api";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: "62%",
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#fec15d",
  },
}))(LinearProgress);
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "NotoSansCJKtc",
    flexGrow: 1,
    width: "100%",
  },
  tangle: {
    width: "100%",
    height: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  rating: {
    position: "absolute",
    right: "3%",
  },
  fraction: {
    fontSize: "64px",
  },
  text: {
    fontFamily: "Roboto",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.38)",
  },

  gridList: {},
  magetty: {
    padding: "2%",
    width: "88px",
    height: "88px",
  },
  time: {
    fontSize: "12px",
  },
  progress: {
    marginLeft: "4%",
    marginBottom:"1%",
  },
}));

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3c5754",
    },
  },
});
const id = 1;
export default function TrailCommit() {
  const classes = useStyles();
  const [comment, setComment] = useState([]);
  const commentApi = async (id) => {
    await demoapi.get("/api/comment/" + id).then((res) => {
      setComment(res.data.comments);
    });
  };
  useEffect(() => {
    commentApi(id);
  }, [id]);

  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={lightTheme}>
          <AppBar position="static">
            <Toolbar>
              <Link to={{ pathname: "/home" }}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <ArrowBackIcon style={{ color: "white" }} />
                </IconButton>
              </Link>
              <Typography variant="h6" className={classes.title}>
                步道評論與討論
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <Grid className={classes.tangle} />

        <Grid className={classes.progress}>
          <Grid className={classes.rating}>
            <Grid className={classes.fraction}> 4.7</Grid>
            <Rating name="size-small" defaultValue={4} size="small" />
            <Grid className={classes.text}> (1,945)</Grid>
          </Grid>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ThemeProvider className={classes.number}>5 </ThemeProvider>
              <BorderLinearProgress
                className={classes.progress}
                variant="determinate"
                value={70}
              />
            </ListItem>

            <ListItem>
              <ThemeProvider>4</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={80}
                className={classes.progress}
              />
            </ListItem>
            <ListItem>
              <ThemeProvider className={classes.number}> 3</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={60}
                className={classes.progress}
              />
            </ListItem>
            <ListItem>
              <ThemeProvider className={classes.number}>2</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={30}
                className={classes.progress}
              />
            </ListItem>
            <ListItem>
              <ThemeProvider className={classes.number}>1</ThemeProvider>
              <BorderLinearProgress
                variant="determinate"
                value={0}
                className={classes.progress}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid className={classes.tangle} />
        <Comment data={comment} />
      </div>
    </>
  );
}
