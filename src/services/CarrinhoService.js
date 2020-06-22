export const CARRINHO_KEY = "Carrinho";

export const adicionaCarrinho = (item) => {
  localStorage.removeItem(CARRINHO_KEY);
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(item));
};
export const limpaCarrinho = () => {
  localStorage.removeItem(CARRINHO_KEY);
};

export const getCarrinho = () => {
  return JSON.parse(localStorage.getItem(CARRINHO_KEY));
};
