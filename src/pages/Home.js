import React from "react";
import Header from "../components/general/Header";
import CategoryList from "../components/home/CategoryList";
import { withRouter } from "react-router-dom";
import ProductList from "../components/home/ProductList";
import ProductDetail from "../components/home/ProductDetail";
import Cart from "../components/home/Cart";
import ApiService from "../services/ApiService";
import { isAuthenticated, getToken } from "../services/AuthService";
import Snack from "../services/SnackService";
import { addItemCart, clearCart, getCart } from "../services/CartService";

class Home extends React.Component {
  state = {
    categories: [],
    products: null,
    product: null,
    openProducDetail: true,
    quantity: 1,
    userName: "",
    openCart: false,
    cart: "",
    openSnack: false,
  };

  async componentDidMount() {
    const response = await ApiService.listCategories();
    this.setState({ categories: response.data });
    if (isAuthenticated()) {
      const token = getToken();

      const user = await ApiService.getUser(token.email, token.token);
      this.setState({ userName: user.data.name });
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
      openProducDetail: true,
    });
  };
  closeModal = () => {
    this.setState({ openProducDetail: false });
  };

  handleQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };

  addProduct = () => {
    const itemCart = {
      product: this.state.product,
      quantity: this.state.quantity,
    };
    const carrinho = this.fillCart(itemCart);
    this.setState({ quantity: 1 });
    addItemCart(carrinho);
    this.closeModal();
    this.openSnack();
  };

  fillCart = (itemCart) => {
    var cart = getCart();
    if (!cart) {
      cart = [].concat(itemCart);
    } else {
      cart = cart.filter((item) => item.product.id !== itemCart.product.id);
      cart = cart.concat(itemCart);
    }
    return cart;
  };

  clearCart = () => {
    clearCart();
    this.setState({ cart: "" });
  };

  openCart = () => {
    this.setState({ openCart: true, cart: getCart() });
  };

  closeCart = () => {
    this.setState({ openCart: false });
  };

  removeItemCart = (id) => {
    const newCart = this.state.cart.filter((item) => item.product.id !== id);
    addItemCart(newCart);
    this.setState({ cart: newCart });
  };

  sendCartToOrder = () => {
    if (!isAuthenticated()) {
      this.props.history.push({
        pathname: "/login",
        state: { detail: "haveCart", cart: this.state.cart },
      });
    } else {
      this.props.history.push({
        pathname: "/confirmation",
        state: { detail: this.state.cart },
      });
    }
  };

  openSnack = () => {
    this.setState({ openSnack: true });
  };

  closeSnack = () => {
    this.setState({
      openSnack: false,
    });
  };

  render() {
    const {
      categories,
      products,
      product,
      openProducDetail,
      quantity,
      userName,
      openCart,
      cart,
      openSnack,
    } = this.state;
    return (
      <>
        <Snack
          openSnack={openSnack}
          closeSnack={this.closeSnack}
          message="Produto adicionado com sucesso."
          severity="success"
        />
        <Header
          userName={userName}
          openCart={this.openCart}
          showIconCart="true"
          showLoginIcon="true"
          clearCart={this.clearCart}
        />
        <Cart
          openCart={openCart}
          closeCart={this.closeCart}
          cart={cart}
          clearCart={this.clearCart}
          removeItemCart={this.removeItemCart}
          sendCartToOrder={this.sendCartToOrder}
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
            openProducDetail={openProducDetail}
            quantity={quantity}
            closeModal={this.closeModal}
            addProduct={this.addProduct}
          />
        )}
      </>
    );
  }
}

export default withRouter(Home);
