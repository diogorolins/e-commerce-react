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
    handleClickOpen,
    open,
    carregaCampos,
    handleClose,
    estados,
    handleCloseCancel,
    estado,
    carregaCamposCidade,
    cidades,
    cidade,
  } = props;

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="default"
        onClick={handleClickOpen}
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
            id="rua"
            label="Rua"
            name="rua"
            autoFocus
            onChange={carregaCampos}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="numero"
            label="Número"
            name="numero"
            onChange={carregaCampos}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="complemento"
            label="Complemento"
            name="complemento"
            onChange={carregaCampos}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bairro"
            label="Bairro"
            name="bairro"
            onChange={carregaCampos}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cep"
            label="CEP"
            name="cep"
            onChange={carregaCampos}
          />
          <InputLabel>Estado</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            id="estado"
            name="estado"
            onChange={carregaCamposCidade}
            value={estado}
          >
            {estados.map((estado) => {
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
            id="cidade"
            name="cidade"
            value={cidade}
            onChange={carregaCampos}
          >
            {cidades.map((cidade) => {
              return (
                <MenuItem key={cidade.id} value={cidade.id}>
                  {cidade.name}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Endereco;
