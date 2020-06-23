import React from "react";
import Link from "@material-ui/core/Link";
import { isAuthenticated, logout } from "../../services/AuthService";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  boxLeft: {
    float: "left",
    width: "60%",
    marginTop: "5px",
  },
  boxRight: {
    float: "left",
    width: "40%",
    textAlignLast: "right",
  },
  linkHome: {
    color: "white",
    fontSize: 25,
  },
  buttonHeader: {
    display: "inline-block",
    margin: "5px",
    padding: 0,
    color: "white",
    fontWeight: "bold",
  },
  boxHeader: {
    float: "left",
    backgroundColor: "#750000",
    color: "primary.contrastText",
    width: "95%",
    padding: "15px",
    borderRadius: "4px",
    display: "block",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const {
    history,
    userName,
    openCart,
    showIconCart,
    clearCart,
    showLoginIcon,
  } = props;

  const loginFunction = () => {
    history.push({
      pathname: "/login",
      state: { detail: "" },
    });
  };

  const logoutFunction = () => {
    logout();
    clearCart();
    history.push("/");
  };

  return (
    <Box className={classes.boxHeader}>
      <Box className={classes.boxLeft} alignItems="left">
        <Link className={classes.linkHome} href="/">
          Venda de Produtos
        </Link>
      </Box>

      <Box className={classes.boxRight} alignItems="right">
        {isAuthenticated() && (
          <Box className={classes.buttonHeader}>{`Bem-vindo, ${userName}`}</Box>
        )}
        {showIconCart && (
          <Box className={classes.buttonHeader}>
            <Button variant="contained" color="primary" onClick={openCart}>
              <ShoppingCartIcon />
            </Button>
          </Box>
        )}

        {showLoginIcon && (
          <Box className={classes.buttonHeader}>
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
        )}
      </Box>
    </Box>
  );
};
export default withRouter(Header);
