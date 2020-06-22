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

const PedidoFinalizado = (props) => {
  const classes = useStyles();
  const { detalhePedido } = props;

  return (
    <div className={classes.root}>
      <h1 className={classes.text}>Finalização do pedido</h1>
      <p>
        Seu pedido de número: <strong>{detalhePedido.id}</strong> foi registrado
        e em breve entraremos em contado pelo email:
        <strong>{detalhePedido.client.email}</strong>.
      </p>
      <p>Obrigado!</p>
    </div>
  );
};

export default PedidoFinalizado;
