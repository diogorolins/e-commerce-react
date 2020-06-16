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
    });
  };

  render() {
    return (
      <>
        <Header />

        <CategoryList
          categories={this.state.categories}
          getProducts={this.getProducts}
        />

        {this.state.products && (
          <ProductList
            products={this.state.products}
            getProduct={this.getProductDetail}
          />
        )}
        {this.state.product && <ProductDetail product={this.state.product} />}
      </>
    );
  }
}

export default Home;
