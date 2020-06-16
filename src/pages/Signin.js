import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import Endereco from "../components/Endereco";
import EnderecoLista from "../components/EnderecoLista";
import Header from "../components/Header";
import ApiService from "../services/ApiService";
import Button from "@material-ui/core/Button";
import ValidaForm from "../services/ValdaForm";
import InputLabel from "@material-ui/core/InputLabel";
import Snack from "../services/Snack";
import { withRouter } from "react-router-dom";

class Signin extends React.Component {
  state = {
    open: false,
    openSnack: false,
    nome: "",
    email: "",
    cpfCnpj: "",
    tipoCliente: "",
    senha: "",
    enderecos: [],
    estados: [],
    cidades: [],
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    fixo: "",
    celular: "",
    erros: [],
    severity: "error",
  };

  handleClickOpen = async () => {
    const response = await ApiService.listEstados();
    this.setState({ open: true, estados: response.data });
  };

  handleClose = () => {
    const endereco = {
      rua: this.state.rua,
      numero: this.state.numero,
      complemento: this.state.complemento,
      bairro: this.state.bairro,
      cep: this.state.cep,
      estado: this.state.estados.filter((e) => e.id === this.state.estado),
      cidade: this.state.cidades.filter((e) => e.id === this.state.cidade),
    };

    const enderecoValida = {
      rua: { value: this.state.rua, label: "Rua" },
      numero: { value: this.state.numero, label: "Número" },
      bairro: { value: this.state.bairro, label: "Bairro" },
      cep: { value: this.state.cep, label: "CEP" },
      estado: {
        value: this.state.estados.filter((e) => e.id === this.state.estado),
        label: "Estado",
      },
      cidade: {
        value: this.state.cidades.filter((e) => e.id === this.state.cidade),
        label: "Cidade",
      },
    };

    const erros = ValidaForm(enderecoValida);
    this.setState({ erros: erros[0] });
    if (erros.length === 0) {
      this.setState({ enderecos: [...this.state.enderecos, endereco] });
      this.setState({ open: false });
    } else {
      this.setState({ openSnack: true });
    }
  };

  limpaEndereco = () => {
    this.setState({
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      estado: "",
      cidade: "",
    });
  };

  handleCloseCancel = () => {
    this.limparEndereco();
    this.setState({
      open: false,
    });
  };

  carregaCampos = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  carregaCamposCidade = async (event) => {
    this.carregaCampos(event);
    const response = await ApiService.listCidades(event.target.value);
    this.setState({ cidades: response.data });
  };

  limparEndereco = (id) => {
    const enderecosAtualizados = this.state.enderecos.filter((i, index) => {
      return index !== id;
    });
    this.setState({ enderecos: enderecosAtualizados });
  };

  submitForm = async () => {
    const client = {
      name: this.state.nome,
      email: this.state.email,
      cpfCnpj: this.state.cpfCnpj,
      clientType: this.state.tipoCliente,
      password: this.state.senha,
      addresses: this.state.enderecos,
      phones: [this.state.fixo, this.state.celular].filter((e) => e !== ""),
    };
    const clientValida = {
      name: { value: this.state.nome, label: "Nome" },
      email: { value: this.state.email, label: "Email" },
      cpfCnpj: { value: this.state.cpfCnpj, label: "CPF" },
      clientType: { value: this.state.tipoCliente, label: "Tipo de cliente" },
      password: { value: this.state.senha, label: "Senha" },
      addresses: {
        value: this.state.enderecos,
        label: "Pelo menos um endereço",
      },
      phones: {
        value: [this.state.fixo, this.state.celular].filter((e) => e !== ""),
        label: "Pelo menos um telefone",
      },
    };
    const erros = ValidaForm(clientValida);
    this.setState({ erros: erros[0] });

    if (erros.length === 0) {
      await ApiService.insereCliente(client);
      this.props.history.push({
        pathname: "/login",
        state: { detail: "teste" },
      });
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
      open,
      nome,
      email,
      cpfCnpj,
      tipoCliente,
      senha,
      estados,
      estado,
      cidades,
      cidade,
      fixo,
      celular,
      openSnack,
      erros,
      severity,
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
        <form>
          <Container component="main" maxWidth="xs">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoFocus
              value={nome}
              onChange={this.carregaCampos}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              value={email}
              onChange={this.carregaCampos}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpfCnpj"
              label="cpfCnpj"
              name="cpfCnpj"
              autoFocus
              value={cpfCnpj}
              onChange={this.carregaCampos}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={this.carregaCampos}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Telefone Celular"
              id="celular"
              name="celular"
              value={celular}
              onChange={this.carregaCampos}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Telefone Fixo"
              id="fixo"
              name="fixo"
              value={fixo}
              onChange={this.carregaCampos}
            />
            <InputLabel>Tipo de Cliente</InputLabel>
            <Select
              variant="outlined"
              id="tipoCliente"
              name="tipoCliente"
              fullWidth
              value={tipoCliente}
              onChange={this.carregaCampos}
            >
              <MenuItem value="1">Pessoa Física</MenuItem>
              <MenuItem value="2">Pessoa Jurídica</MenuItem>
            </Select>

            <Endereco
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
              carregaCampos={this.carregaCampos}
              open={open}
              estados={estados}
              cidades={cidades}
              handleCloseCancel={this.handleCloseCancel}
              handleCidade={this.handleCidade}
              estado={estado}
              carregaCamposCidade={this.carregaCamposCidade}
              cidade={cidade}
            />
            <EnderecoLista
              enderecos={this.state.enderecos}
              limparEndereco={this.limparEndereco}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submitForm}
            >
              Enviar
            </Button>
          </Container>
        </form>
      </>
    );
  }
}

export default withRouter(Signin);
