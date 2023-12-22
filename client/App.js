import React, { Fragment as Fr } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { Container } from "@chakra-ui/react";
import { connect } from "react-redux";
import { storeLocalCart } from "./helper";
class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.auth.id) return;
    if (prevProps.cart.length !== this.props.cart.length)
      storeLocalCart(this.props.cart);
  }
  render() {
    return (
      <Fr>
        <Navbar />
        <Container maxW="container.xl" mt="1.5rem">
          {true && <Routes />}
        </Container>
      </Fr>
    );
  }
}
const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  auth: state.auth,
});

export default connect(mapStateToProps)(App);

// let localCart = JSON.parse(localStorage.getItem("cart"));
//   if (!localCart) localStorage.setItem("cart", JSON.stringify(cart));
//   else {

//     if (edited) {let editCart = {};
//       for (const el of cart) editCart[el.productId] = { ...el };

//       localCart = localCart.filter(el=>{
//         const item = editCart[el.productId];
//         if(!item) return false;
//         return item.numItems === el.numItems;
//       })
//     }
//     localStorage.setItem("cart", JSON.stringify([...localCart, ...cart]));
//   }
