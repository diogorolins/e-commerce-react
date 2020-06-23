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

const ConfirmAddress = (props) => {
  const classes = useStyles();
  const { addresses, pickAddress, selectedAddress } = props;

  return (
    <>
      <div className={classes.root}>
        <h1 className={classes.text}>Selecione um endereço</h1>
        <FormControl component="fieldset">
          <RadioGroup
            name="address1"
            value={`${selectedAddress}`}
            onChange={pickAddress}
          >
            {addresses &&
              addresses.map((item) => (
                <ExpansionPanel key={item.id}>
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
                      value={`${item.id}`}
                      control={<Radio />}
                      label={`${item.street}, ${item.number}`}
                    />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography color="textSecondary">
                      {`Bairro: ${item.neighborhood} - CEP: ${item.zipCode} - ${item.city.name}/${item.city.state.name}`}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};
export default ConfirmAddress;
