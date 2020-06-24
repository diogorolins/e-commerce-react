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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "15px",
  },
  error: {
    margin: "15px",
    background: "red",
  },
}));

const Address = (props) => {
  const classes = useStyles();
  const {
    openModalAddress,
    openAddress,
    closeModalAddress,
    states,
    cancelModalAddress,
    fillFormFieldsCity,
    fillFormFieldsAddress,
    cities,
    state,
    city,
    errorsForm,
  } = props;

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="default"
        onClick={openModalAddress}
        className={
          errorsForm.includes("addresses") ? classes.error : classes.button
        }
      >
        Escolha o endereço
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openAddress}
        fullWidth
      >
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
            onChange={fillFormFieldsAddress}
            error={errorsForm.includes("street")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="number"
            label="Número"
            name="number"
            onChange={fillFormFieldsAddress}
            error={errorsForm.includes("number")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="compl"
            label="Complemento"
            name="compl"
            onChange={fillFormFieldsAddress}
            error={errorsForm.includes("compl")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="neighborhood"
            label="Bairro"
            name="neighborhood"
            onChange={fillFormFieldsAddress}
            error={errorsForm.includes("neighborhood")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="zipCode"
            label="CEP"
            name="zipCode"
            onChange={fillFormFieldsAddress}
            error={errorsForm.includes("zipCode")}
          />
          <InputLabel>Estado</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            id="state"
            name="state"
            onChange={fillFormFieldsCity}
            value={state}
            error={errorsForm.includes("state")}
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
            onChange={fillFormFieldsAddress}
            value={city}
            error={errorsForm.includes("city")}
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
          <Button onClick={cancelModalAddress} color="primary">
            Cancel
          </Button>
          <Button onClick={closeModalAddress} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Address;
