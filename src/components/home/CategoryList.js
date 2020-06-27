import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    color: "#750000",
    fontWeight: "bolder",
    fontSize: "20px",
    paddingTop: "10px",
    paddingLeft: "10px",
  },
}));

const CategoryList = (props) => {
  const { categories, getProducts, openProgress } = props;
  const classes = useStyles();

  return (
    <Grid item xs={3}>
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
    </Grid>
  );
};
export default CategoryList;
