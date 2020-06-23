import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const OrderSent = (props) => {
  const classes = useStyles();
  const { orderDetail } = props;

  return (
    <div className={classes.root}>
      <h1 className={classes.text}>Finalização do pedido</h1>
      <p>
        Seu pedido de número: <strong>{orderDetail.id}</strong> foi registrado e
        em breve entraremos em contado pelo email:
        <strong>{orderDetail.client.email}</strong>.
      </p>
      <p>Obrigado!</p>
    </div>
  );
};

export default OrderSent;
