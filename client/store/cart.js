import axios from "axios";
import { getLocalCart, storeLocalCart } from "../helper";
import history from "../history";

const cartState = {
  cart: [], // {id, title, descr, price, img, qty}
};

// ACTION TYPES
const GOT_CART = "GOT_CART";
const ADD_TO_CART = "ADD_TO_CART";
const INCREASE_QTY = "INCREASE_QTY";
const DECREASE_QTY = "DECREASE_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
const PURCHASE_ORDER = "PURCHASE_ORDER";

// ACTION CREATORS
export const _gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

export const _addToCart = (orderProduct) => ({
  type: ADD_TO_CART,
  orderProduct,
});

// adjust quantity
export const _decreaseQty = (id, numItems) => ({
  type: DECREASE_QTY,
  id,
  numItems,
});
export const _increaseQty = (id, numItems, totalPrice) => ({
  type: INCREASE_QTY,
  id,
  numItems,
  totalPrice,
});

export const _removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const _clearCart = () => ({
  type: CLEAR_CART,
});

export const _purchaseOrder = () => ({
  type: PURCHASE_ORDER,
});

// THUNK CREATORS
export function getCart() {
  return async (dispatch, getState) => {
    try {
      const token = localStorage.getItem("token");
      let data;
      if (!token) {
        const cartLocal = getLocalCart();
        data = Array.isArray(cartLocal)
          ? [...cartLocal]
          : [...getState().cart.cart];
      } else {
        const { data: dataFetched } = await axios.get(`/api/orders/cart`, {
          headers: { authorization: token },
        });
        data = dataFetched;
      }
      dispatch(_gotCart(data));
    } catch (err) {
      console.error(err);
    }
  };
}
// currently cannot remove as guest
export function removeFromCart(id) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(`/api/orders/cart/${id}`, {
          headers: { authorization: token },
        });
      }
      dispatch(_removeFromCart(id));
    } catch (err) {
      console.error(err);
    }
  };
}

export function increaseQty(id, numItems, totalPrice) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.put(
          `/api/orders/cart/${id}`,
          { numItems, totalPrice },
          { headers: { authorization: token } }
        );
      }
      dispatch(_increaseQty(id));
    } catch (err) {
      console.error(err);
    }
  };
}

export function decreaseQty(id, numItems, totalPrice) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.put(
          `/api/orders/cart/${id}`,
          { numItems, totalPrice },
          { headers: { authorization: token } }
        );
      }
      dispatch(_decreaseQty(id));
    } catch (err) {
      console.error(err);
    }
  };
}

export function purchaseOrder(id, subTotal) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("no token");
      } else {
        await axios.put(
          `/api/orders/${id}`,
          { subTotal },
          { headers: { authorization: token } }
        );
      }
      dispatch(_purchaseOrder());
      history.push("/profile");
    } catch (err) {
      console.error(err);
    }
  };
}

// REDUCER
const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case GOT_CART:
      return { ...state, cart: [...action.cart] };

    case ADD_TO_CART:
      if (
        state.cart.some((el) => el.productId === action.orderProduct.productId)
      )
        return state;
      return { cart: [...state.cart, action.orderProduct] };

    case INCREASE_QTY:
      const newInState = {
        ...state,
        cart: state.cart.map((product) => {
          const id = product.id || product.localId;
          return id === action.id
            ? {
                ...product,
                numItems: product.numItems + 1,

                totalPrice: +(
                  Math.round(
                    (product.numItems + 1) * product.product.price * 1e12
                  ) / 1e12
                ).toFixed(2),
              }
            : product;
        }),
      };
      if (!newInState.cart[0].id) storeLocalCart(newInState.cart);
      return newInState;

    case DECREASE_QTY:
      const newDeState = {
        ...state,
        cart: state.cart.map((product) => {
          const id = product.id || product.localId;
          return id === action.id
            ? {
                ...product,
                numItems: product.numItems - 1,

                totalPrice: +(
                  Math.round(
                    (product.numItems - 1) * product.product.price * 1e12
                  ) / 1e12
                ).toFixed(2),
              }
            : product;
        }),
      };
      if (!newDeState.cart[0].id) storeLocalCart(newDeState.cart);
      return newDeState;
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          if (!item.id) return item.localId !== action.id;
          return item.id !== action.id;
        }),
      };

    case CLEAR_CART:
    case PURCHASE_ORDER:
      return { cart: [] };

    default:
      return state;
  }
};

export default cartReducer;
