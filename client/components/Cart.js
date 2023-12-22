import React, { Fragment as Fr, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { buttonStyle } from "../styles";
import history from "../history";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getCart, purchaseOrder } from "../store/cart";
import CheckoutAlert from "./ui/CheckoutAlert";
import {
  Heading,
  Grid,
  GridItem as Gi,
  HStack,
  Box,
  Spacer,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import Cartproduct from "./Cartproduct";

const Cart = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    props.getCart();
  }, []);

  const getSubTotal = () => {
    if (!props.cart.length) return 0;
    return props.cart.reduce(
      (cur, el) => Math.round((cur + el.totalPrice) * 1e12) / 1e12,
      0
    );
  };
  const handleCheckout = () => {
    //this still needs more stuff
    //currently just validating if there is a user logged in
    props.purchaseOrder(props.cart[0].orderId, getSubTotal());
    onClose();
  };

  return (
    <Fr>
      <CheckoutAlert
        isOpen={isOpen}
        onClose={onClose}
        userId={props.auth.id}
        handleCheckout={handleCheckout}
        subTotal={getSubTotal()}
      />
      <HStack mb={4}>
        <Heading textTransform="uppercase" color="tea.brown">
          Your cart
        </Heading>
        <Spacer />
        {!!props.cart.length && (
          <Box
            as="button"
            {...buttonStyle("outline")}
            fontSize="xl"
            fontWeight="bold"
            textTransform="uppercase"
            onClick={onOpen}
          >
            Checkout
          </Box>
        )}
      </HStack>
      <Grid
        templateColumns="65% repeat(3,1fr)"
        fontSize="lg"
        alignItems="center"
        gap={3}
        pb={12}
      >
        {!!props.cart.length ? (
          <Fr>
            <Gi>Product</Gi>
            <Gi>Price</Gi>
            <Gi>Quantity</Gi>
            <Gi>Total</Gi>
            <Gi
              gridColumn="1 / -1"
              borderBottom="1px solid"
              borderColor="blackAlpha.500"
              height={1}
              width="100%"
            ></Gi>

            {props.cart.map((el, i) => (
              <Cartproduct key={el.productId} el={el} localId={i + 1} />
            ))}
            <Gi gridColumn="1 / span 3">Subtotal:</Gi>
            <Gi fontWeight="bold">${getSubTotal()}</Gi>
          </Fr>
        ) : (
          <Gi gridColumn="1 / -1" as={Center} p={4} flexDir="column">
            <Heading mb={5}>Your shopping cart is empty</Heading>
            <Box
              {...buttonStyle()}
              as="button"
              fontSize="2xl"
              textTransform="uppercase"
            >
              <Link to="/products">Continue Shopping</Link>
            </Box>
          </Gi>
        )}
      </Grid>
    </Fr>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart()),
    purchaseOrder: (id, subTotal) => dispatch(purchaseOrder(id, subTotal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
