import React from "react";
import Link from "@material-ui/core/Link";
import { isAuthenticated, logout } from "../services/Auth";
import { withRouter } from "react-router-dom";
import useStyles from "./UseStyles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Header = (props) => {
  const classes = useStyles();
  const {
    history,
    userName,
    openCarrinho,
    temCarrinho,
    desmontaCarrinho,
  } = props;

  const loginFunction = () => {
    history.push({
      pathname: "/login",
      state: { detail: "" },
    });
  };

  const logoutFunction = () => {
    logout();
    desmontaCarrinho();
    history.push("/");
  };

  return (
    <Box className={classes.boxHeader}>
      <Box className={classes.boxEsquerda} alignItems="left">
        <Link className={classes.linkHome} href="/">
          Venda de Produtos
        </Link>
      </Box>

      <Box className={classes.boxDireita} alignItems="right">
        {isAuthenticated() && (
          <Box className={classes.botaoHeader}>{`Bem-vindo, ${userName}`}</Box>
        )}
        {temCarrinho && (
          <Box className={classes.botaoHeader}>
            <Button
              variant="contained"
              className={classes.botaoHeader}
              color="primary"
              onClick={openCarrinho}
            >
              <ShoppingCartIcon />
            </Button>
          </Box>
        )}

        <Box className={classes.botaoHeader}>
          {!isAuthenticated() ? (
            <Button onClick={loginFunction} variant="contained">
              Login
            </Button>
          ) : (
            <>
              <Button onClick={logoutFunction} variant="contained">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default withRouter(Header);
