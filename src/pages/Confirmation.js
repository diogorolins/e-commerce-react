import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import ConfirmAddress from "../components/confirm/ConfirmAddress";
import ConfirmPayment from "../components/confirm/ConfirmPayment";
import OrderSent from "../components/confirm/OrderSent";
import Review from "../components/confirm/Review";
import Header from "../components/general/Header";
import ApiService from "../services/ApiService";
import { isAuthenticated, getToken } from "../services/AuthService";
import { clearCart } from "../services/CartService";
import moment from "moment";

const styles = {
  paper: {
    display: "block",
    width: "95%",
    float: "left",
  },
  buttons: {
    textAlign: "center",
  },
};

const steps = [
  "Confirme o endereço",
  "Confirme o pagamento",
  "Confirmação do pedido",
];

class Confirmation extends React.Component {
  state = {
    user: "",
    activeStep: 0,
    order: {
      client: "",
      address: "",
      payment: "",
      items: "",
    },
    selectedAddress: 0,
    paymentType: "paymentCard",
    dueDate: "",
    installments: 1,
    orderDetail: "",
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ConfirmAddress
            addresses={this.state.user.addresses}
            pickAddress={this.pickAddress}
            selectedAddress={this.state.selectedAddress}
          />
        );
      case 1:
        return (
          <ConfirmPayment
            paymentType={this.state.paymentType}
            choosePaymentType={this.choosePaymentType}
            dueDate={this.state.dueDate}
            installments={this.state.installments}
            changeInstallments={this.changeInstallments}
          />
        );
      case 2:
        return (
          <Review
            order={this.state.order}
            addresses={this.state.user.addresses}
            selectedAddress={this.state.selectedAddress}
            paymentType={this.state.paymentType}
            dueDate={this.state.dueDate}
            installments={this.state.installments}
            sendOrder={this.sendOrder}
          />
        );
      default:
        return <OrderSent orderDetail={this.state.orderDetail} />;
    }
  };

  handleNext = () => {
    if (this.state.selectedAddress !== 0) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  pickAddress = (event) => {
    this.setState({ selectedAddress: event.target.value });
  };

  choosePaymentType = (event) => {
    this.setState({ paymentType: event.target.value });
  };

  changeInstallments = (event) => {
    this.setState({ installments: event.target.value });
  };

  async componentDidMount() {
    if (isAuthenticated()) {
      var dueDate = moment().add(7, "days");
      const token = getToken();
      const user = await ApiService.getUser(token.email, token.token);

      this.setState({
        user: user.data,
        order: {
          client: user.data.id,
          items: this.props.location.state.detail,
        },
        dueDate: `${dueDate.toDate().getDate()}/${
          dueDate.toDate().getMonth() + 1
        }/${dueDate.toDate().getFullYear()}`,
      });
    }
  }

  sendOrder = async () => {
    const items = this.state.order.items.map((item) => {
      return { quantity: item.quantity, product: { id: item.product.id } };
    });

    const pedido = {
      client: { id: this.state.order.client },
      address: { id: this.state.selectedAddress },
      payment: {
        "@type": this.state.paymentType,
        installment: this.state.installments,
      },
      items,
    };

    const token = getToken();
    const orderDetail = await ApiService.sendOrder(pedido, token.token);
    clearCart();
    this.setState({ activeStep: 55, orderDetail: orderDetail.data });
  };

  render() {
    const { classes } = this.props;
    const { user, activeStep } = this.state;

    return (
      <>
        <Header userName={user.name} />

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
              {this.getStepContent(activeStep)}
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

export default withStyles(styles)(Confirmation);
