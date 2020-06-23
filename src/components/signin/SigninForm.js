import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import Address from "./Address";
import ListAddress from "./ListAddress";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const SigninForm = (props) => {
  const {
    fillFormFields,
    clientType,
    openModalAddress,
    closeModalAddress,
    cancelModalAddress,
    fillFormFieldsCity,
    removeAddressFromList,
    fillFormFieldsAddress,
    states,
    cities,
    addresses,
    saveUser,
    openAddress,
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
        onChange={fillFormFields}
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
        onChange={fillFormFields}
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
        onChange={fillFormFields}
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
        onChange={fillFormFields}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Telefone Celular"
        id="celular"
        name="celular"
        onChange={fillFormFields}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Telefone Fixo"
        id="fixo"
        name="fixo"
        onChange={fillFormFields}
      />
      <InputLabel>Tipo de Cliente</InputLabel>
      <Select
        variant="outlined"
        id="tipoCliente"
        name="clientType"
        fullWidth
        value={clientType}
        onChange={fillFormFields}
      >
        <MenuItem value="1">Pessoa Física</MenuItem>
        <MenuItem value="2">Pessoa Jurídica</MenuItem>
      </Select>

      <Address
        openModalAddress={openModalAddress}
        closeModalAddress={closeModalAddress}
        fillFormFieldsAddress={fillFormFieldsAddress}
        openAddress={openAddress}
        states={states}
        cities={cities}
        state={state}
        city={city}
        cancelModalAddress={cancelModalAddress}
        fillFormFieldsCity={fillFormFieldsCity}
      />
      <ListAddress
        addresses={addresses}
        removeAddressFromList={removeAddressFromList}
      />
      <Button fullWidth variant="contained" color="primary" onClick={saveUser}>
        Enviar
      </Button>
    </Container>
  );
};
export default SigninForm;
