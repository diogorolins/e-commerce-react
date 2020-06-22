import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const Endereco = (props) => {
  const {
    abreModalEnderecos,
    open,
    fechaModalEnderecos,
    states,
    cancelaModalEndereco,
    carregaCamposCidade,
    carregaCamposEndereco,
    cities,
    state,
    city,
  } = props;

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="default"
        onClick={abreModalEnderecos}
      >
        Escolha o endereço
      </Button>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} fullWidth>
        <DialogTitle>Escolha o endereço</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="street"
            label="Rua"
            name="street"
            autoFocus
            onChange={carregaCamposEndereco}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="number"
            label="Número"
            name="number"
            onChange={carregaCamposEndereco}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="compl"
            label="Complemento"
            name="compl"
            onChange={carregaCamposEndereco}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="neighborhood"
            label="Bairro"
            name="neighborhood"
            onChange={carregaCamposEndereco}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="zipCode"
            label="CEP"
            name="zipCode"
            onChange={carregaCamposEndereco}
          />
          <InputLabel>Estado</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            id="state"
            name="state"
            onChange={carregaCamposCidade}
            value={state}
          >
            {states.map((estado) => {
              return (
                <MenuItem key={estado.id} value={estado.id}>
                  {estado.name}
                </MenuItem>
              );
            })}
          </Select>
          <InputLabel>Cidade</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            id="city"
            name="city"
            onChange={carregaCamposEndereco}
            value={city}
          >
            {cities.map((cidade) => {
              return (
                <MenuItem key={cidade.id} value={cidade.id}>
                  {cidade.name}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelaModalEndereco} color="primary">
            Cancel
          </Button>
          <Button onClick={fechaModalEnderecos} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Endereco;
