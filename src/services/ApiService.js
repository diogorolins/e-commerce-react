import axios from "axios";

//const urlBase = "http://localhost:8080";
const urlBase = "hhttps://orders-backend.herokuapp.com";

const api = axios.create({
  baseURL: urlBase,
});

const ApiService = {
  listCategories: async () => await api.get("categories"),
  listProducts: async (id) => await api.get(`products/?categories=${id}`),
  getProductById: async (id) => await api.get(`products/${id}`),
  login: async (creds) => await api.post("login", creds),
  listStates: async () => await api.get("states"),
  listCities: async (id) => await api.get(`states/${id}/cities`),
  sendClient: async (cliente) =>
    await api.post("clients", cliente).catch((error) => error.response),
  getUser: async (email, token) =>
    api.get(`clients/email?email=${email}`, {
      headers: { Authorization: "Bearer " + token },
    }),
  sendOrder: async (pedido, token) => {
    return api.post("orders", pedido, {
      headers: { Authorization: "Bearer " + token },
    });
  },
};
export default ApiService;
