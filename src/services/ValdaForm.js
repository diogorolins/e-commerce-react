const ValidaForm = (campos) => {
  const camposErro = [];
  for (let campo in campos) {
    if (!campos[campo] || campos[campo].length === 0) {
      camposErro.push("Preencha os campos");
    }
  }
  return camposErro;
};
export default ValidaForm;
