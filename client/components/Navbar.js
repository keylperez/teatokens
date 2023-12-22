import React, { Fragment as Fr } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { _clearCart } from "../store/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Text,
  HStack,
  Spacer,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  Icon,
} from "@chakra-ui/react";

const Navbar = ({ handleClick, isLoggedIn, user }) => {
  return (
    <Box>
      <Container maxW="container.xl">
        <HStack fontSize="1.4rem" pt={12} spacing="3rem">
          <Text
            fontFamily="Alumni Sans Inline One, cursive"
            color="tea.green"
            fontSize="3.9rem"
          >
            <Link to="/home">TeaTokens</Link>
          </Text>
          <Spacer />
          <Text>
            <Link to="/aboutus">about us</Link>
          </Text>
          <Text>
            <Link to="/products">shop</Link>
          </Text>
          <Text>
            <Link to="/cart">
              <Icon
                as={AiOutlineShoppingCart}
                w={7}
                h={7}
                transform="translateY(3px)"
              />
            </Link>
          </Text>

          {isLoggedIn ? (
            <Fr>
              {/* The navbar will show these links after you log in */}

              <Menu>
                <MenuButton as="button">
                  <Avatar name={user.username} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem as="button" onClick={handleClick}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>

              {/*<h3>Welcome, {user.username.split(" ")[0]}!</h3>

          <Link to={`/users/${user.id}/profile`}>Profile</Link>

          <a href="#" onClick={handleClick}>
            Logout
      </a>*/}
            </Fr>
          ) : (
            <Fr>
              <Link to="/auth">sign in</Link>
            </Fr>
          )}
        </HStack>
      </Container>
    </Box>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(_clearCart());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
