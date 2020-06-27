import React from "react";
import Link from "@material-ui/core/Link";
import { isAuthenticated, logout } from "../../services/AuthService";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles(() => ({
  linkHome: {
    color: "white",
    fontSize: 25,
  },
  buttonHeader: {
    color: "white",
    fontWeight: "bold",
  },
  boxHeader: {
    backgroundColor: "#750000",
    color: "primary.contrastText",
    borderRadius: "4px",
    padding: "0px 20px",
    padding: "12px",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { history, userName, openCart, showIconCart, clearCart } = props;

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
    <Grid
      container
      className={classes.boxHeader}
      justify="space-between"
      direction="row"
    >
      <Grid item>
        <Link className={classes.linkHome} href="/">
          Venda de Produtos
        </Link>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            {showIconCart && (
              <Button
                variant="contained"
                color="primary"
                onClick={openCart}
                className={classes.buttonHeader}
              >
                <ShoppingCartIcon />
              </Button>
            )}
          </Grid>

          {isAuthenticated() ? (
            <>
              <Grid item className={classes.buttonHeader}>
                {`Bem-vindo, ${userName}`}
              </Grid>
              <Grid item>
                <Button onClick={logoutFunction} variant="contained">
                  Logout
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Button onClick={loginFunction} variant="contained">
                Login
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(Header);
