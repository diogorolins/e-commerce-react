import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Address from "./Address";
import ListAddress from "./ListAddress";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "15px",
    width: "50%",
  },
  text: {
    color: "#750000",
    fontWeight: "bolder",
    fontSize: "20px",
    padding: "15px",
    width: "95%",
    display: "inline-block",
  },
  select: {
    width: "196px",
  },
  button: {
    margin: "15px",
  },
}));

const SigninForm = (props) => {
  const classes = useStyles();
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
    errorsForm,
  } = props;

  return (
    <>
      <h1 className={classes.text}>Informe seus dados</h1>
      <Grid container spacing={4} alignItems="center" className={classes.form}>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Nome"
            name="name"
            autoFocus
            onChange={fillFormFields}
            error={errorsForm.includes("name")}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            onChange={fillFormFields}
            error={errorsForm.includes("email")}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="cpfCnpj"
            label="cpfCnpj"
            name="cpfCnpj"
            onChange={fillFormFields}
            error={errorsForm.includes("cpfCnpj")}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Senha"
            type="password"
            id="password"
            name="password"
            onChange={fillFormFields}
            error={errorsForm.includes("password")}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Telefone Celular"
            id="celular"
            name="celular"
            onChange={fillFormFields}
            error={errorsForm.includes("phones")}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            label="Telefone Fixo"
            id="fixo"
            name="fixo"
            error={errorsForm.includes("phones")}
          />
        </Grid>
        <Grid item>
          <InputLabel id="Pessoa">Pessoa</InputLabel>
          <Select
            labelId="Pessoa"
            variant="outlined"
            id="tipoCliente"
            name="clientType"
            value={clientType}
            onChange={fillFormFields}
            label="Pessoa"
            className={classes.select}
          >
            <MenuItem value="1">Pessoa Física</MenuItem>
            <MenuItem value="2">Pessoa Jurídica</MenuItem>
          </Select>
        </Grid>
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
          errorsForm={errorsForm}
        />
        <ListAddress
          addresses={addresses}
          removeAddressFromList={removeAddressFromList}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={saveUser}
          className={classes.button}
        >
          Enviar
        </Button>
      </Grid>
    </>
  );
};
export default SigninForm;
