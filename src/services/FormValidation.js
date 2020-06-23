const FormValidation = (formFields) => {
  const fields = [];
  for (let field in formFields) {
    if (!formFields[field] || formFields[field].length === 0) {
      fields.push("Preencha os campos");
    }
  }
  return fields;
};
export default FormValidation;
