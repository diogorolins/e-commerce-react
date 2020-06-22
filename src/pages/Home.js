import React from "react";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import { withRouter } from "react-router-dom";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import Carrinho from "../components/Carrinho";
import ApiService from "../services/ApiService";
import { isAuthenticated, getToken } from "../services/Auth";
import {
  adicionaCarrinho,
  limpaCarrinho,
  getCarrinho,
} from "../services/CarrinhoService";
import "../components/index.css";

class Home extends React.Component {
  state = {
    categories: [],
    products: null,
    product: null,
    open: true,
    quantity: 1,
    userName: "",
    carrinhoAberto: false,
    carrinho: [],
  };

  async componentDidMount() {
    const response = await ApiService.listCategories();
    this.setState({ categories: response.data });
    if (isAuthenticated()) {
      const token = getToken();

      const usuario = await ApiService.getUsuario(token.email, token.token);
      this.setState({ userName: usuario.data.name });
    }
  }

  getProducts = async (item) => {
    const response = await ApiService.listProducts(item);
    this.setState({ products: response.data.content });
  };

  getProductDetail = async (item) => {
    const response = await ApiService.getProductById(item);
    this.setState({
      product: {
        id: response.data.id,
        name: response.data.name,
        price: response.data.price,
      },
      open: true,
    });
  };
  fechaModal = () => {
    this.setState({ open: false });
  };

  handleQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };

  adicionaProduto = () => {
    const itemCarrinho = {
      produto: this.state.product,
      qtd: this.state.quantity,
    };
    const carrinho = this.montaCarrinho(itemCarrinho);
    this.setState({ quantity: 1 });
    adicionaCarrinho(carrinho);
    this.fechaModal();
  };

  montaCarrinho = (itemCarrinho) => {
    var carrinho = getCarrinho();
    if (!carrinho) {
      carrinho = [].concat(itemCarrinho);
    } else {
      carrinho = carrinho.filter(
        (item) => item.produto.id !== itemCarrinho.produto.id
      );
      carrinho = carrinho.concat(itemCarrinho);
    }
    return carrinho;
  };

  desmontaCarrinho = () => {
    limpaCarrinho();
    this.setState({ carrinho: [] });
  };

  openCarrinho = () => {
    this.setState({ carrinhoAberto: true, carrinho: getCarrinho() });
  };

  closeCarrinho = () => {
    this.setState({ carrinhoAberto: false });
  };

  removeItemCarrinho = (id) => {
    const novoCarrinho = this.state.carrinho.filter(
      (item) => item.produto.id !== id
    );
    adicionaCarrinho(novoCarrinho);
    this.setState({ carrinho: novoCarrinho });
  };

  fechaCompra = () => {
    if (!isAuthenticated()) {
      this.props.history.push({
        pathname: "/login",
        state: { detail: "veioCarrinho", carrinho: this.state.carrinho },
      });
    } else {
      this.props.history.push({
        pathname: "/confirmacao",
        state: { detail: this.state.carrinho },
      });
    }
  };

  render() {
    const {
      categories,
      products,
      product,
      open,
      quantity,
      userName,
      carrinhoAberto,
      carrinho,
    } = this.state;
    return (
      <>
        <Header
          userName={userName}
          openCarrinho={this.openCarrinho}
          temCarrinho="true"
          desmontaCarrinho={this.desmontaCarrinho}
        />
        <Carrinho
          open={carrinhoAberto}
          close={this.closeCarrinho}
          carrinho={carrinho}
          desmontaCarrinho={this.desmontaCarrinho}
          removeItemCarrinho={this.removeItemCarrinho}
          fechaCompra={this.fechaCompra}
        />
        <CategoryList categories={categories} getProducts={this.getProducts} />

        {products && (
          <ProductList
            products={products}
            getProductDetail={this.getProductDetail}
          />
        )}
        {product && (
          <ProductDetail
            product={product}
            handleQuantity={this.handleQuantity}
            open={open}
            quantity={quantity}
            fechaModal={this.fechaModal}
            adicionaProduto={this.adicionaProduto}
          />
        )}
      </>
    );
  }
}

export default withRouter(Home);
