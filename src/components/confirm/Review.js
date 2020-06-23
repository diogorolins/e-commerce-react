import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "0 50px 50px 50px",
  },
  text: {
    color: "#750000",
    fontWeight: "bolder",
    fontSize: "20px",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  esq: {
    width: "40%",
    display: "inline-block",
  },
  dir: {
    display: "inline-block",
    width: "50%",
    verticalAlign: "top",
  },
}));

const Review = (props) => {
  const classes = useStyles();
  const {
    order,
    addresses,
    selectedAddress,
    paymentType,
    dueDate,
    installments,
    sendOrder,
  } = props;
  const address = addresses.filter(
    (item) => item.id + "" === selectedAddress + ""
  );

  const totalCart = () => {
    const total = order.items.reduce(
      (acc, item) => (acc += item.quantity * item.product.price),
      0
    );
    return total;
  };

  return (
    <>
      <div className={classes.root}>
        <h1 className={classes.text}>Revisão do pedido</h1>
        <div className={classes.esq}>
          <List className={classes.list}>
            {order.items.map((item) => (
              <React.Fragment key={item.product.id}>
                <ListItem>
                  <ListItemText
                    primary={item.product.name}
                    secondary={`R$ ${item.product.price}`}
                  />
                  <ListItemText
                    primary="Quantidade:"
                    secondary={item.quantity}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </div>
        <div className={classes.dir}>
          <p>
            <strong>Endereco:</strong>
          </p>
          <p>{`${address[0].street}, ${address[0].number} - ${address[0].neighborhood}`}</p>
          <p>{`${address[0].city.name}/ ${address[0].city.state.name}`}</p>
          <p>
            <strong>Pagamento:</strong>
            {paymentType === "paymentCard"
              ? ` Pagamento com Cartão -  Parcelas: ${installments}`
              : ` Pagamento com Boleto - Vencimento: ${dueDate}`}
          </p>
          <p>
            <strong>Total do Pedido: </strong>
            R$ {totalCart()}
          </p>
          <Button variant="contained" color="primary" onClick={sendOrder}>
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </>
  );
};
export default Review;
