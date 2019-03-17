const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Nomes devem conter no mínimo 2 e no máximo 30 caracteres.'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Nome é Obrigatório para o Cadastro.'
  }

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

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirmar a Senha é Obrigatório para o Cadastro.'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Senhas Diferentes. Tente Novamente.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}