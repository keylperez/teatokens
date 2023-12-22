import React, { Fragment as Fr } from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/product";
import MyGrid from "./ui/MyGrid";
import { Heading, Image, GridItem as Gi, Text } from "@chakra-ui/react";
import ProductItem from "./ProductItem";

/**
 * COMPONENT
 */

export class Home extends React.Component {
  constructor() {
    super();
    this.randomizeFeaturedProducts = this.randomizeFeaturedProducts.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  randomizeFeaturedProducts() {
    const products = this.props.products;
    const featured = [];
    const map = {};
    while (featured.length !== 6 && products.length) {
      const random = Math.floor(Math.random() * products.length);
      if (map[random] === undefined) {
        featured.push(products[random]);
      }
      map[random] = random;
    }
    return featured;
  }
  render() {
    return (
      <Fr>
        <MyGrid mb="2rem">
          <Gi gridColumn="1 / span 2">
            <Image
              src="https://leavla.com/wp-content/uploads/2019/06/Darjeeling-Green-Tera.jpg"
              alt="tea image"
              objectFit="cover"
              width="100%"
            />
          </Gi>
          <Gi alignSelf="center">
            <Heading color="tea.brown" fontWeight="700" fontSize="5xl" mb={4}>
              Only The Best
            </Heading>
            <Text fontSize="lg">
              TeaTokens offers the highest quality hand-picked, full-leaf teas
              from the finest tea gardens and estates.
            </Text>
          </Gi>
          <Gi gridColumn="1 / -1">
            <Heading color="tea.green" textTransform="uppercase">
              Featured
            </Heading>
          </Gi>
          {!!this.props.products.length &&
            this.randomizeFeaturedProducts().map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  product={product}
                  auth={this.props.user}
                />
              );
            })}
        </MyGrid>
      </Fr>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth,
    products: state.product.allProducts,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(Home);
