const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email é Obrigatório para o Cadastro.'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Formato de Email Inválido.'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Senha é Obrigatório para o Cadastro.'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 18 })) {
    errors.password = 'Senhas devem conter no mínimo 6 e no máximo 18 caracteres.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}