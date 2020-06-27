import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    padding: "20px 50px 50px 50px",
    maxWidth: "500px",
  },
  text: {
    color: "#750000",
    fontWeight: "bolder",
    fontSize: "20px",
  },
});

const LoginForm = (props) => {
  const classes = useStyles();
  const {
    fillFormFields,
    login,
    password,
    submitFormLogin,
    goToSignin,
  } = props;
  return (
    <div className={classes.root}>
      <h1 className={classes.text}>Login</h1>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="login"
        label="Email"
        name="login"
        autoFocus
        value={login}
        onChange={fillFormFields}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        value={password}
        onChange={fillFormFields}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="default"
        onClick={submitFormLogin}
      >
        Entrar
      </Button>
      <Grid container>
        <Grid item xs>
          <Button color="primary">Esqueceu a senha?</Button>
        </Grid>
        <Grid item>
          <Button color="primary" onClick={goToSignin}>
            Cadastro
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(LoginForm);
