export const CART_KEY = "Carrinho";

export const addItemCart = (item) => {
  localStorage.removeItem(CART_KEY);
  localStorage.setItem(CART_KEY, JSON.stringify(item));
};
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY));
};
