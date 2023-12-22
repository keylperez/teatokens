import axios from "axios";

export async function addToCart(productId, numItems = 1, id = null) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No user found");
    }
    const authorizationObj = { headers: { authorization: token } };
    if (id) authorizationObj.user = { id };
    await axios.post(
      `/api/orders`,
      { prodId: productId, numItems },
      { ...authorizationObj }
    );
  } catch (err) {
    throw err;
  }
}

export function storeLocalCart(cart) {
  localStorage.setItem("cart", JSON.stringify([...cart]));
}

export function getLocalCart() {
  return JSON.parse(localStorage.getItem("cart"));
}

export function clearLocalCart() {
  localStorage.removeItem("cart");
}
