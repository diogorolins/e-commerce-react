import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/box";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: "top",
    position: "relative",
  },

  text: {
    display: "inline-block",
    width: "40%",
  },
  h1: {
    fontSize: "18px",
  },
  h2: {
    fontSize: "16px",
  },
  form: {
    display: "inline-block",
    position: "relative",
    width: "55%",
    verticalAlign: "center",
  },
  item: {
    display: "inline-block",
    padding: "8px",
  },
}));

const ProductDetail = (props) => {
  const {
    quantity,
    product,
    handleQuantity,
    openProducDetail,
    closeModal,
    addProduct,
  } = props;
  const arrayQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const classes = useStyles();
  return (
    <>
      <Dialog open={openProducDetail} fullWidth>
        <DialogTitle>Adicione ao carrinho</DialogTitle>
        <DialogContent>
          <Box>
            <img
              width="100%"
              alt="imagem do produto"
              src={`https://springcourse.s3-sa-east-1.amazonaws.com/prod${product.id}.jpg`}
            />
          </Box>
          <Box className={classes.root}>
            <Box className={classes.text}>
              <h1 className={classes.h1}>{product.name}</h1>
              <h2 className={classes.h2}>{`Preço: R$ ${product.price}`}</h2>
            </Box>
            <Box className={classes.form}>
              <Box className={classes.item}>
                <InputLabel>Quantidade</InputLabel>
                <Select value={quantity} onChange={handleQuantity}>
                  {arrayQuantity.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box className={classes.item}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={addProduct}
                >
                  Adicionar
                </Button>
              </Box>
              <Box className={classes.item}>
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  onClick={closeModal}
                >
                  Fechar
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ProductDetail;
