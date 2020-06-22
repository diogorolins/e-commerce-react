import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0 50px 50px 50px",
  },
  text: {
    color: "#750000",
    fontWeight: "bolder",
    fontSize: "20px",
  },
});
const quantidade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ConfirmacaoPagamento = (props) => {
  const classes = useStyles();
  const {
    tipoPagamento,
    escolheTipoPagamento,
    expiracaBolelo,
    parcelas,
    alteraParcelas,
  } = props;

  return (
    <>
      <div className={classes.root}>
        <h1 className={classes.text}>Selecione o tipo de pagamento</h1>
        <FormControl component="fieldset">
          <RadioGroup
            name="payment1"
            value={tipoPagamento}
            onChange={escolheTipoPagamento}
          >
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  value="paymentCard"
                  control={<Radio />}
                  label="Pagamento com Cartão de Crédito"
                />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  {`Parcelas: `}
                  <Select value={parcelas} onChange={alteraParcelas}>
                    {quantidade.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  value="paymentBoleto"
                  control={<Radio />}
                  label="Pagamento por Boleto"
                />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  {`Vencimento: ${expiracaBolelo}`}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default ConfirmacaoPagamento;
