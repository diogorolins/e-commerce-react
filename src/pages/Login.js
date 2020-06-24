import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/general/Header";
import ApiService from "../services/ApiService";
import { login, fillToken } from "../services/AuthService";
import Snack from "../services/SnackService";
import LoginForm from "../components/login/LoginForm";

class Login extends React.Component {
  state = {
    login: "",
    password: "",
    open: false,
    errors: [],
    severity: "error",
  };

  closeSnack = () => {
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
      login(fillToken(response.headers.authorization));
      if (this.props.location.state.detail === "haveCart") {
        this.props.history.push({
          pathname: "/confirmation",
          state: { cart: this.props.location.state.cart },
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
  fillFormFields = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  goToSignin = () => {
    this.props.history.push("/signin");
  };

  render() {
    const { open, login, password, errors, severity } = this.state;
    return (
      <>
        <Header />
        <Snack
          openSnack={open}
          closeSnack={this.closeSnack}
          message={errors}
          severity={severity}
        />
        <LoginForm
          fillFormFields={this.fillFormFields}
          login={login}
          password={password}
          submitFormLogin={this.submitFormLogin}
          goToSignin={this.goToSignin}
        />
      </>
    );
  }
}
export default withRouter(Login);
