import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/box";
import Grid from "@material-ui/core/grid";

import "./index.css";

class ProductDetail extends React.Component {
  state = {
    quantity: 1,
  };

  handleQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };

  render() {
    const { product } = this.props;
    const quantidade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <>
        <Dialog open="false" fullWidth>
          <DialogTitle>Escolha o Produto</DialogTitle>
          <DialogContent>
            <Box width="100%">
              <Box width="80px">
                <img
                  src={`https://springcourse.s3-sa-east-1.amazonaws.com/prod${product.id}.jpg`}
                />
              </Box>
              <Box width="40%">
                {product.name}
                {<span>R$ {product.price}</span>}
              </Box>
            </Box>
            <FormControl>
              <Grid
                container
                className="formAdiciona"
                spacing={6}
                alignItems="center"
              >
                <Grid item>
                  <InputLabel>Quantidade</InputLabel>
                  <Select
                    value={this.state.quantity}
                    onChange={this.handleQuantity}
                  >
                    {quantidade.map((item) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" size="small">
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default ProductDetail;
