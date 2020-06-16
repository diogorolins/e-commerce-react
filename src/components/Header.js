import React from "react";
import Link from "@material-ui/core/Link";
import { isAuthenticated, logout } from "../services/Auth";
import { withRouter } from "react-router-dom";
import useStyles from "./UseStyles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const Header = (props) => {
  const classes = useStyles();
  const { history } = props;

  const loginFunction = () => {
    history.push("/login");
  };

  const logoutFunction = () => {
    logout();
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
        {!isAuthenticated() ? (
          <Button
            onClick={loginFunction}
            variant="contained"
            className={classes.botaoHeader}
          >
            Login
          </Button>
        ) : (
          <>
            <Button
              onClick={logoutFunction}
              variant="contained"
              className={classes.botaoHeader}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
export default withRouter(Header);
