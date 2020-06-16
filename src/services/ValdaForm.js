const ValidaForm = (campos) => {
  const camposErro = [];
  for (let campo in campos) {
    if (!campos[campo].value || campos[campo].value.length === 0) {
      camposErro.push(`${campos[campo].label} obrigatório`);
    }
  }
  return camposErro;
};
export default ValidaForm;
