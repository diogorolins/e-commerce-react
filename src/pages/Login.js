import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import Header from "../components/general/Header";
import ApiService from "../services/ApiService";
import { login } from "../services/AuthService";
import Snack from "../services/SnackService";

class Login extends React.Component {
  state = {
    login: "",
    password: "",
    open: false,
    errors: [],
    severity: "error",
  };

  handleCloseSnack = () => {
    this.setState({
      open: false,
    });
  };

  submitFormLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      email: this.state.login,
      password: this.state.password,
    };

    try {
      const response = await ApiService.login(JSON.stringify(credentials));
      const token = response.headers.authorization;
      login(token.substring(7, token.length));
      if (this.props.location.state.detail === "haveCart") {
        this.props.history.push({
          pathname: "/confirmacao",
          state: { detail: this.props.location.state.cart },
        });
      } else {
        this.props.history.push("/");
      }
    } catch (err) {
      this.setState({
        open: true,
        errors: ["Login ou senha inválidos"],
      });
    }
  };
  componentDidMount() {
    if (this.props.location.state.detail === "confirm") {
      this.setState({
        open: true,
        severity: "success",
        errors: ["Usuário cadastrado com sucesso."],
      });
    }
  }

  render() {
    const { open, login, password, errors, severity } = this.state;
    return (
      <>
        <Header />
        <Snack
          openSnack={open}
          handleCloseSnack={this.handleCloseSnack}
          message={errors}
          severity={severity}
        />
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            value={login}
            onChange={(e) => this.setState({ login: e.target.value })}
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
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            onClick={this.submitFormLogin}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Cadastro"}
              </Link>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
export default withRouter(Login);
