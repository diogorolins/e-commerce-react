import React from "react";
import Header from "../components/Header";
import ApiService from "../services/ApiService";
import ValidaForm from "../services/ValdaForm";
import Snack from "../services/Snack";
import { withRouter } from "react-router-dom";
import FormularioCadastro from "../components/FormularioCadastro";

class Signin extends React.Component {
  state = {
    openEndereco: false,
    openSnack: false,
    name: "",
    email: "",
    cpfCnpj: "",
    clientType: "",
    password: "",
    fixo: "",
    celular: "",
    addresses: [],
    address: {
      street: "",
      number: "",
      compl: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    states: [],
    cities: [],

    erros: [],
    severity: "error",
  };

  abreModalEnderecos = async () => {
    const response = await ApiService.listEstados();
    this.setState({ openEndereco: true, states: response.data });
  };

  fechaModalEnderecos = () => {
    const addressObject = {
      ...this.state.address,
      state: this.state.states.filter(
        (e) => e.id === this.state.address.state
      )[0],
      city: this.state.cities.filter(
        (e) => e.id === this.state.address.city
      )[0],
    };

    const erros = ValidaForm(addressObject);

    this.setState({ erros: erros[0] });
    if (erros.length === 0) {
      this.setState({
        addresses: [...this.state.addresses, addressObject],
      });
      this.limpaEndereco();
      this.setState({ openEndereco: false });
    } else {
      this.setState({ openSnack: true });
    }
  };

  limpaEndereco = () => {
    this.setState({
      address: {
        street: "",
        number: "",
        compl: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
      cityValue: "",
      stateValue: "",
    });
  };

  cancelaModalEndereco = () => {
    this.limpaEndereco();
    this.setState({
      openEndereco: false,
    });
  };

  carregaCampos = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  carregaCamposCidade = async (event) => {
    this.carregaCamposEndereco(event);
    const response = await ApiService.listCidades(event.target.value);
    this.setState({ cities: response.data });
  };

  carregaCamposEndereco = (event) => {
    const { name, value } = event.target;
    this.setState({
      address: { ...this.state.address, [name]: value },
    });
  };

  removeEnderecoLista = (id) => {
    const enderecosAtualizados = this.state.addresses.filter((i, index) => {
      return index !== id;
    });
    this.setState({ addresses: enderecosAtualizados });
  };

  salvaUsuario = async () => {
    const client = {
      name: this.state.name,
      email: this.state.email,
      cpfCnpj: this.state.cpfCnpj,
      clientType: this.state.clientType,
      password: this.state.password,
      addresses: this.state.addresses,
      phones: [this.state.fixo, this.state.celular].filter((e) => e !== ""),
    };

    const erros = ValidaForm(client);
    this.setState({ erros: erros[0] });

    if (erros.length === 0) {
      const response = await ApiService.insereCliente(client);

      if (response.status === 201) {
        this.props.history.push({
          pathname: "/login",
          state: { detail: "confirm" },
        });
      } else {
        this.setState({
          erros: response.data.errors[0].message,
          openSnack: true,
        });
      }
    } else {
      this.setState({ openSnack: true });
    }
  };

  handleCloseSnack = () => {
    this.setState({
      openSnack: false,
    });
  };

  render() {
    const {
      openEndereco,
      clientType,
      states,
      cities,
      openSnack,
      erros,
      severity,
      addresses,
      address,
    } = this.state;

    return (
      <>
        <Header />
        <Snack
          openSnack={openSnack}
          handleCloseSnack={this.handleCloseSnack}
          erros={erros}
          severity={severity}
        />
        <FormularioCadastro
          carregaCampos={this.carregaCampos}
          clientType={clientType}
          abreModalEnderecos={this.abreModalEnderecos}
          fechaModalEnderecos={this.fechaModalEnderecos}
          cancelaModalEndereco={this.cancelaModalEndereco}
          carregaCamposCidade={this.carregaCamposCidade}
          carregaCamposEndereco={this.carregaCamposEndereco}
          states={states}
          cities={cities}
          addresses={addresses}
          removeEnderecoLista={this.removeEnderecoLista}
          salvaUsuario={this.salvaUsuario}
          open={openEndereco}
          state={address.state}
          city={address.city}
        />
      </>
    );
  }
}

export default withRouter(Signin);
