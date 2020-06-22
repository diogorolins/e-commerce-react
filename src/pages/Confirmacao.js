import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import ConfirmacaoEndereco from "../components/confirmacao/ConfirmacaoEndereco";
import ConfirmacaoPagamento from "../components/confirmacao/ConfirmacaoPagamento";
import PedidoFinalizado from "../components/confirmacao/PedidoFinalizado";
import Revisao from "../components/confirmacao/Revisao";
import Header from "../components/geral/Header";
import ApiService from "../services/ApiService";
import { isAuthenticated, getToken } from "../services/Auth";
import { limpaCarrinho } from "../services/CarrinhoService";
import moment from "moment";

const styles = {
  paper: {
    display: "block",
    width: "95%",
    float: "left",
  },
  stepper: {},

  buttons: {
    textAlign: "center",
  },
  button: {},
};

const steps = [
  "Confirme o endereço",
  "Confirme o pagamento",
  "Confirmação do pedido",
];

function getStepContent(
  step,
  addresses,
  escolheEndereco,
  enderecoSelecionado,
  tipoPagamento,
  escolheTipoPagamento,
  expiracaBolelo,
  parcelas,
  alteraParcelas,
  order,
  enviarPedido,
  detalhePedido
) {
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
      return (
        <ConfirmacaoPagamento
          tipoPagamento={tipoPagamento}
          escolheTipoPagamento={escolheTipoPagamento}
          expiracaBolelo={expiracaBolelo}
          parcelas={parcelas}
          alteraParcelas={alteraParcelas}
        />
      );
    case 2:
      return (
        <Revisao
          order={order}
          addresses={addresses}
          enderecoSelecionado={enderecoSelecionado}
          tipoPagamento={tipoPagamento}
          expiracaBolelo={expiracaBolelo}
          parcelas={parcelas}
          enviarPedido={enviarPedido}
        />
      );
    default:
      return <PedidoFinalizado detalhePedido={detalhePedido} />;
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
    tipoPagamento: "paymentCard",
    expiracaBolelo: "",
    parcelas: 1,
    detalhePedido: "",
  };

  handleNext = () => {
    if (this.state.enderecoSelecionado !== 0) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  escolheEndereco = (event) => {
    this.setState({ enderecoSelecionado: event.target.value });
  };

  escolheTipoPagamento = (event) => {
    this.setState({ tipoPagamento: event.target.value });
  };

  alteraParcelas = (event) => {
    this.setState({ parcelas: event.target.value });
  };

  async componentDidMount() {
    if (isAuthenticated()) {
      var minhaData = moment().add(7, "days");
      const token = getToken();
      const usuario = await ApiService.getUsuario(token.email, token.token);

      this.setState({
        usuario: usuario.data,
        order: {
          client: usuario.data.id,
          items: this.props.location.state.detail,
        },
        expiracaBolelo: `${minhaData.toDate().getDate()}/${
          minhaData.toDate().getMonth() + 1
        }/${minhaData.toDate().getFullYear()}`,
      });
    }
  }

  enviarPedido = async () => {
    const items = this.state.order.items.map((item) => {
      return { quantity: item.qtd, product: { id: item.produto.id } };
    });

    const pedido = {
      client: { id: this.state.order.client },
      address: { id: this.state.enderecoSelecionado },
      payment: {
        "@type": this.state.tipoPagamento,
        installment: this.state.parcelas,
      },
      items,
    };

    const token = getToken();
    const detalhePedido = await ApiService.inserePedido(pedido, token.token);
    limpaCarrinho();
    this.setState({ activeStep: 55, detalhePedido: detalhePedido.data });
  };

  render() {
    const { classes } = this.props;
    const {
      usuario,
      activeStep,
      order,
      enderecoSelecionado,
      tipoPagamento,
      expiracaBolelo,
      parcelas,
      detalhePedido,
    } = this.state;

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
            <React.Fragment>
              {getStepContent(
                activeStep,
                usuario.addresses,
                this.escolheEndereco,
                enderecoSelecionado,
                tipoPagamento,
                this.escolheTipoPagamento,
                expiracaBolelo,
                parcelas,
                this.alteraParcelas,
                order,
                this.enviarPedido,
                detalhePedido
              )}
              <div className={classes.buttons}>
                {activeStep !== 0 && activeStep !== 55 && (
                  <Button onClick={this.handleBack} className={classes.button}>
                    Anterior
                  </Button>
                )}
                {activeStep !== steps.length - 1 && activeStep !== 55 && (
                  <Button
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Próximo
                  </Button>
                )}
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Confirmacao);
