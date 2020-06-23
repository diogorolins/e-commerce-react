import React from "react";
import Header from "../components/general/Header";
import ApiService from "../services/ApiService";
import FormValidation from "../services/FormValidation";
import Snack from "../services/SnackService";
import { withRouter } from "react-router-dom";
import SigninForm from "../components/signin/SigninForm";

class Signin extends React.Component {
  state = {
    openAddress: false,
    openSnack: false,
    name: "",
    email: "",
    cpfCnpj: "",
    clientType: "",
    password: "",
    fixo: "",
    celular: "",
    addresses: [],
    address: {
      street: "",
      number: "",
      compl: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    states: [],
    cities: [],

    errors: [],
    severity: "error",
  };

  openModalAddress = async () => {
    const response = await ApiService.listStates();
    this.setState({ openAddress: true, states: response.data });
  };

  closeModalAddress = () => {
    const addressObject = {
      ...this.state.address,
      state: this.state.states.filter(
        (e) => e.id === this.state.address.state
      )[0],
      city: this.state.cities.filter(
        (e) => e.id === this.state.address.city
      )[0],
    };

    const erros = FormValidation(addressObject);

    this.setState({ errors: erros[0] });
    if (erros.length === 0) {
      this.setState({
        addresses: [...this.state.addresses, addressObject],
      });
      this.cleanAddress();
      this.setState({ openAddress: false });
    } else {
      this.setState({ openSnack: true });
    }
  };

  cleanAddress = () => {
    this.setState({
      address: {
        street: "",
        number: "",
        compl: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
      cityValue: "",
      stateValue: "",
    });
  };

  cancelModalAddress = () => {
    this.cleanAddress();
    this.setState({
      openAddress: false,
    });
  };

  fillFormFields = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  fillFormFieldsCity = async (event) => {
    this.fillFormFieldsAddress(event);
    const response = await ApiService.listCities(event.target.value);
    this.setState({ cities: response.data });
  };

  fillFormFieldsAddress = (event) => {
    const { name, value } = event.target;
    this.setState({
      address: { ...this.state.address, [name]: value },
    });
  };

  removeAddressFromList = (id) => {
    const updatedAddresses = this.state.addresses.filter((i, index) => {
      return index !== id;
    });
    this.setState({ addresses: updatedAddresses });
  };

  saveUser = async () => {
    const client = {
      name: this.state.name,
      email: this.state.email,
      cpfCnpj: this.state.cpfCnpj,
      clientType: this.state.clientType,
      password: this.state.password,
      addresses: this.state.addresses,
      phones: [this.state.fixo, this.state.celular].filter((e) => e !== ""),
    };

    const errors = FormValidation(client);
    this.setState({ errors: errors[0] });

    if (errors.length === 0) {
      const response = await ApiService.sendClient(client);

      if (response.status === 201) {
        this.props.history.push({
          pathname: "/login",
          state: { detail: "confirm" },
        });
      } else {
        this.setState({
          errors: response.data.errors[0].message,
          openSnack: true,
        });
      }
    } else {
      this.setState({ openSnack: true });
    }
  };

  handleCloseSnack = () => {
    this.setState({
      openSnack: false,
    });
  };

  render() {
    const {
      openAddress,
      clientType,
      states,
      cities,
      openSnack,
      errors,
      severity,
      addresses,
      address,
    } = this.state;

    return (
      <>
        <Header />
        <Snack
          openSnack={openSnack}
          handleCloseSnack={this.handleCloseSnack}
          message={errors}
          severity={severity}
        />
        <SigninForm
          fillFormFields={this.fillFormFields}
          clientType={clientType}
          openModalAddress={this.openModalAddress}
          closeModalAddress={this.closeModalAddress}
          cancelModalAddress={this.cancelModalAddress}
          fillFormFieldsCity={this.fillFormFieldsCity}
          fillFormFieldsAddress={this.fillFormFieldsAddress}
          states={states}
          cities={cities}
          addresses={addresses}
          removeAddressFromList={this.removeAddressFromList}
          saveUser={this.saveUser}
          openAddress={openAddress}
          state={address.state}
          city={address.city}
        />
      </>
    );
  }
}

export default withRouter(Signin);
