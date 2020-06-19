import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import Endereco from "../components/Endereco";
import EnderecoLista from "../components/EnderecoLista";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const FormularioCadastro = (props) => {
  const {
    carregaCampos,
    clientType,
    abreModalEnderecos,
    fechaModalEnderecos,
    cancelaModalEndereco,
    carregaCamposCidade,
    removeEnderecoLista,
    carregaCamposEndereco,
    states,
    cities,
    addresses,
    salvaUsuario,
    open,
    state,
    city,
  } = props;

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nome"
        name="name"
        autoFocus
        onChange={carregaCampos}
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
        onChange={carregaCampos}
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
        onChange={carregaCampos}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Senha"
        type="password"
        id="password"
        name="password"
        onChange={carregaCampos}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Telefone Celular"
        id="celular"
        name="celular"
        onChange={carregaCampos}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Telefone Fixo"
        id="fixo"
        name="fixo"
        onChange={carregaCampos}
      />
      <InputLabel>Tipo de Cliente</InputLabel>
      <Select
        variant="outlined"
        id="tipoCliente"
        name="clientType"
        fullWidth
        value={clientType}
        onChange={carregaCampos}
      >
        <MenuItem value="1">Pessoa Física</MenuItem>
        <MenuItem value="2">Pessoa Jurídica</MenuItem>
      </Select>

      <Endereco
        abreModalEnderecos={abreModalEnderecos}
        fechaModalEnderecos={fechaModalEnderecos}
        carregaCamposEndereco={carregaCamposEndereco}
        open={open}
        states={states}
        cities={cities}
        state={state}
        city={city}
        cancelaModalEndereco={cancelaModalEndereco}
        carregaCamposCidade={carregaCamposCidade}
      />
      <EnderecoLista
        addresses={addresses}
        removeEnderecoLista={removeEnderecoLista}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={salvaUsuario}
      >
        Enviar
      </Button>
    </Container>
  );
};
export default FormularioCadastro;
