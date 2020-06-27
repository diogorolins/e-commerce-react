import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  text: {
    color: "#750000",
    fontWeight: "bolder",
    fontSize: "20px",
    paddingTop: "10px",
    paddingLeft: "20px",
  },
  container: {
    padding: "20px",
  },
}));

const ProductList = (props) => {
  const { products, getProductDetail } = props;
  const classes = useStyles();
  return (
    <Grid item xs={6}>
      <div className={classes.text}>{"Selecione um Produto"}</div>

      <Grid container spacing={4} className={classes.container}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={`https://springcourse.s3-sa-east-1.amazonaws.com/prod${product.id}.jpg`}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {`R$ ${product.price}`}
                </Typography>
                <Typography>{product.name}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    getProductDetail(product.id);
                  }}
                >
                  Ver Detalhes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProductList;
