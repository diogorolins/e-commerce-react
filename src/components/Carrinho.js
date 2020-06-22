import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "3px solid #750000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40%",
    minHeight: "300px",
    maxHeight: "600px",
    marginTop: "20px",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Carrinho = (props) => {
  const classes = useStyles();
  const {
    open,
    close,
    carrinho,
    desmontaCarrinho,
    removeItemCarrinho,
    fechaCompra,
  } = props;

  const totalCarrinho = () => {
    if (carrinho) {
      const total = carrinho.reduce(
        (acc, item) => (acc += item.qtd * item.produto.price),
        0
      );
      return total;
    }
    return 0;
  };

  return (
    <div>
      <Modal className={classes.modal} open={open} onClose={close}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Carrinho</h2>
            <List className={classes.list}>
              {carrinho ? (
                <ListItem>
                  <ListItemText>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={fechaCompra}
                    >
                      Finalizar
                    </Button>
                  </ListItemText>
                  <ListItemText>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={desmontaCarrinho}
                    >
                      Limpar Carrinho
                    </Button>
                  </ListItemText>
                </ListItem>
              ) : (
                <p>O carrinho está vazio.</p>
              )}
              {carrinho &&
                carrinho.map((item) => (
                  <React.Fragment key={item.produto.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={`https://springcourse.s3-sa-east-1.amazonaws.com/prod${item.produto.id}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.produto.name}
                        secondary={`R$ ${item.produto.price}`}
                      />
                      <ListItemText
                        primary="Quantidade:"
                        secondary={item.qtd}
                      />
                      <ListItemText>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => removeItemCarrinho(item.produto.id)}
                        >
                          <DeleteSharpIcon />
                        </Button>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              <ListItem>
                <ListItemText>Total:</ListItemText>
                <ListItemText>R$: {totalCarrinho()}</ListItemText>
              </ListItem>
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Carrinho;
