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

const Revisao = (props) => {
  const classes = useStyles();
  const {
    order,
    addresses,
    enderecoSelecionado,
    tipoPagamento,
    expiracaBolelo,
    parcelas,
    enviarPedido,
  } = props;
  const endereco = addresses.filter(
    (item) => item.id + "" === enderecoSelecionado + ""
  );

  const totalCarrinho = () => {
    const total = order.items.reduce(
      (acc, item) => (acc += item.qtd * item.produto.price),
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
              <React.Fragment key={item.produto.id}>
                <ListItem>
                  <ListItemText
                    primary={item.produto.name}
                    secondary={`R$ ${item.produto.price}`}
                  />
                  <ListItemText primary="Quantidade:" secondary={item.qtd} />
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
          <p>{`${endereco[0].street}, ${endereco[0].number} - ${endereco[0].neighborhood}`}</p>
          <p>{`${endereco[0].city.name}/ ${endereco[0].city.state.name}`}</p>
          <p>
            <strong>Pagamento:</strong>
            {tipoPagamento === "paymentCard"
              ? ` Pagamento com Cartão -  Parcelas: ${parcelas}`
              : ` Pagamento com Boleto - Vencimento: ${expiracaBolelo}`}
          </p>
          <p>
            <strong>Total do Pedido: </strong>
            R$ {totalCarrinho()}
          </p>
          <Button variant="contained" color="primary" onClick={enviarPedido}>
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </>
  );
};
export default Revisao;
