import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "block",
    width: "60%",
    marginLeft: "20px",
    float: "left",
  },
  texto: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    paddingTop: "10px",
    color: "#750000",
    fontWeight: "bolder",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const ProductList = (props) => {
  const { products, getProduct } = props;
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <div className={classes.texto}>{"Selecione um Produto"}</div>
      <Grid container className={classes.root} spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} item>
            <ListItem
              button
              key={product.id}
              onClick={() => {
                getProduct(product.id);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={`https://springcourse.s3-sa-east-1.amazonaws.com/prod${product.id}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`R$ ${product.price}`}
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
