import React from "react";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    paddingTop: "10px",
    color: "#750000",
    fontWeight: "bolder",
  },
  box: {
    display: "block",
    width: "25%",
    marginLeft: "20px",
    float: "left",
  },
}));

const CategoryList = (props) => {
  const { categories, getProducts, openProgress } = props;
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <div className={classes.text}>{"Selecione uma Categoria"}</div>

      {openProgress && <CircularProgress color="secondary" />}

      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {categories.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              key={item.id}
              onClick={() => {
                getProducts(item.id);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={`https://springcourse.s3-sa-east-1.amazonaws.com/cat${item.id}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
export default CategoryList;
