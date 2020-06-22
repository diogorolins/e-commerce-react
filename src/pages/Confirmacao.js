import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ConfirmacaoEndereco from "../components/ConfirmacaoEndereco";
import ConfirmacaoPagamento from "../components/ConfirmacaoPagamento";
import Revisao from "../components/Revisao";
import Header from "../components/Header";
import ApiService from "../services/ApiService";
import { isAuthenticated, getToken } from "../services/Auth";

const styles = {
  paper: {
    display: "block",

    width: "95%",
    float: "left",
  },
  stepper: {},
  buttons: {},
  button: {},
};

const steps = [
  "Confirme o endereço",
  "Confirme o pagamento",
  "Confirmação do pedido",
];

function getStepContent(step, addresses, escolheEndereco, enderecoSelecionado) {
  switch (step) {
    case 0:
      return (
        <ConfirmacaoEndereco
          addresses={addresses}
          escolheEndereco={escolheEndereco}
          enderecoSelecionado={enderecoSelecionado}
        />
      );
    case 1:
      return <ConfirmacaoPagamento />;
    case 2:
      return <Revisao />;
    default:
      throw new Error("Unknown step");
  }
}

class Confirmacao extends React.Component {
  state = {
    usuario: "",
    activeStep: 0,
    order: {
      client: "",
      address: "",
      payment: "",
      items: "",
    },
    enderecoSelecionado: 0,
  };

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  escolheEndereco = (event) => {
    this.setState({ enderecoSelecionado: event.target.value });
    //this.setState({ order: { ...this.state.order, addresses: id } });
  };

  async componentDidMount() {
    if (isAuthenticated()) {
      const token = getToken();
      const usuario = await ApiService.getUsuario(token.email, token.token);

      this.setState({
        usuario: usuario.data,
        order: {
          client: usuario.data.id,
          items: this.props.location.state.detail,
        },
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { usuario, activeStep, order, enderecoSelecionado } = this.state;

    return (
      <>
        <Header userName={usuario.name} />

        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  usuario.addresses,
                  this.escolheEndereco,
                  enderecoSelecionado
                )}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Confirmacao);
