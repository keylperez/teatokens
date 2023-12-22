import React, { Fragment as Fr } from "react";
import { connect } from "react-redux";
import { me } from "../store/profile";
import ProductItem from "./ProductItem";
import MyGrid from "./ui/MyGrid";
import {
  Image,
  Heading,
  Text,
  Center,
  VStack,
  GridItem as Gi,
} from "@chakra-ui/react";
/**
 * COMPONENT
 */
class Profile extends React.Component {
  componentDidMount() {
    this.props.me();
  }
  render() {
    const { profile } = this.props;
    const previousOrders =
      Array.isArray(profile.orders) &&
      profile.orders.filter((el) => !el.isCart);

    return (
      <Fr>
        <Center>
          <VStack textAlign="center" spacing="0.6rem">
            <Image src={profile.imageUrl} alt="image pic" />
            <Heading>{profile.username}</Heading>
            <Text>{profile.email}</Text>
          </VStack>
        </Center>
        {!!previousOrders.length && (
          <MyGrid py="20">
            <Heading textTransform="uppercase" color="tea.brown">
              Previous Orders:
            </Heading>
            {previousOrders.map((el) => (
              <Fr key={el.id}>
                <Gi gridColumn="1 / -1">
                  <Text fontSize="3xl">Order ID: {el.id}</Text>
                  <Text fontSize="3xl">Total Amount Paid: ${el.subTotal}</Text>
                  {profile.order_products
                    .filter((ca) => ca.orderId === el.id)
                    .map((el) => (
                      <Fr key={el.id}>
                        <Text fontSize="xl">
                          {el.product.name} x{el.numItems}: ${el.totalPrice}
                        </Text>
                      </Fr>
                    ))}
                </Gi>
                {!!el.products.length &&
                  el.products.map((prod) => (
                    <ProductItem
                      key={prod.id}
                      product={prod}
                      auth={this.props.user}
                      view={true}
                    />
                  ))}
              </Fr>
            ))}
          </MyGrid>
        )}
      </Fr>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => ({
  profile: { ...state.profile },
  user: state.auth,
});
export default connect(mapState, { me })(Profile);
