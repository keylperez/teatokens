import axios from "axios";
import history from "../history";
const GOT_PRODUCTS = "GOT_PRODUCTS";
const GOT_PRODUCT = "GOT_PRODUCT";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

function _createProduct(product) {
  return {
    type: CREATE_PRODUCT,
    product,
  };
}
function _editProduct(product) {
  return {
    type: EDIT_PRODUCT,
    product,
  };
}
function _deleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    id,
  };
}
export function createProduct(product) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post("/api/products", product, {
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(_createProduct(data));
      history.push("/products");
    } catch (err) {
      console.error(err);
    }
  };
}
export function editProduct(id, product) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(`/api/products/${id}`, product, {
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(_editProduct(data));
      history.push("/products");
    } catch (err) {
      console.error(err);
    }
  };
}
export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(_deleteProduct(id));
    } catch (err) {
      console.error(err);
    }
  };
}

function gotProducts(products) {
  return {
    type: GOT_PRODUCTS,
    products,
  };
}

function gotProduct(product) {
  return {
    type: GOT_PRODUCT,
    product,
  };
}

export function getProducts() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products`);
      dispatch(gotProducts(data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function getProduct(productId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(gotProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
}

const productState = {
  allProducts: [],
  singleProduct: {},
};

const productReducer = (state = productState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, allProducts: [...action.products] };
    case GOT_PRODUCT: {
      return { ...state, singleProduct: { ...action.product } };
    }
    case CREATE_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.product] };
    case EDIT_PRODUCT:
      const allProductsEdit = [...state.allProducts].filter(
        (el) => el.id !== action.product.id
      );
      return { ...state, allProducts: [...allProductsEdit, action.product] };
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter((el) => el.id !== action.id),
      };
    default:
      return state;
  }
};

export default productReducer;
