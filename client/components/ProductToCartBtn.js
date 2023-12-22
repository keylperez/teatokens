import React from "react";
import { buttonStyle } from "../styles";
import { Box } from "@chakra-ui/react";
import { connect } from "react-redux";
import { addToCart } from "../helper";
import { _addToCart } from "../store/cart";
import { useToast } from "@chakra-ui/react";

function ProductToCartBtn({
  btnStyle = null,
  product,
  auth,
  addToLocalCart,
  ...props
}) {
  const toast = useToast();
  const handleAddProduct = async () => {
    try {
      if (auth.id) await addToCart(product.id);
      else {
        addToLocalCart({
          numItems: 1,
          totalPrice: product.price,
          productId: product.id,
          product: { ...product },
        });
      }
      toast({
        title: `Added ${product.name} to cart.`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Box
      as="button"
      {...buttonStyle(btnStyle)}
      {...props}
      onClick={handleAddProduct}
    >
      Add to cart
    </Box>
  );
}
const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => {
  return {
    addToLocalCart: (orderProduct) => dispatch(_addToCart(orderProduct)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductToCartBtn);
