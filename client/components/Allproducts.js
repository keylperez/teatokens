import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/product";
import MyGrid from "./ui/MyGrid";
import ProductItem from "./ProductItem";

import {
  GridItem as Gi,
  Heading,
  Input,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { inputStyle, buttonStyle } from "../styles";

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  handleSearch(e) {
    this.setState({ search: e.target.value });
  }
  render() {
    return (
      <MyGrid mb="3rem">
        <Gi gridColumn="1 / -1" as={HStack} spacing="1rem">
          <Heading color="tea.green" textTransform="uppercase">
            Enjoy
          </Heading>

          <Input
            name="search"
            type="text"
            placeholder="Your tea"
            {...inputStyle}
            onChange={this.handleSearch}
            value={this.state.search}
          />
          {this.props.auth.id && this.props.auth.role === "admin" && (
            <Box as="button" {...buttonStyle()}>
              <Link to="/products/create">
                <Text>Create Product</Text>
              </Link>
            </Box>
          )}
        </Gi>
        {this.props.products
          .filter((product) => {
            if (!this.state.search.trim()) return true;
            return product.name
              .toLowerCase()
              .includes(this.state.search.toLowerCase().trim());
          })
          .map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                auth={this.props.auth}
              />
            );
          })}
      </MyGrid>
    );
  }
}

// <div className="allProducts">
//
//       </div>
const mapStateToProps = (state) => {
  return {
    products: state.product.allProducts,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
