import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";

const LoginForm = (props) => {
  const {
    fillFormFields,
    login,
    password,
    submitFormLogin,
    goToSignin,
  } = props;
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
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
      </Container>
    </>
  );
};

export default withRouter(LoginForm);
