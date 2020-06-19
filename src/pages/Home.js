import React from "react";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import ApiService from "../services/ApiService";
import ProductDetail from "../components/ProductDetail";

import "../components/index.css";

class Home extends React.Component {
  state = {
    categories: [],
    products: null,
    product: null,
    open: true,
    quantity: 1,
  };

  async componentDidMount() {
    const response = await ApiService.listCategories();
    this.setState({ categories: response.data });
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

  render() {
    const { categories, products, product, open, quantity } = this.state;
    return (
      <>
        <Header />

        <CategoryList categories={categories} getProducts={this.getProducts} />

        {products && (
          <ProductList
            products={products}
            getProductDetail={this.getProductDetail}
            open={open}
            quantity={quantity}
            handleQuantity={this.handleQuantity}
            product={product}
            fechaModal={this.fechaModal}
          />
        )}
      </>
    );
  }
}

export default Home;
