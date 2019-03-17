const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Texto é Obrigatório para a Postagem.'
  }

  if (!Validator.isLength(data.text, { min: 10, max: 1500 })) {
    errors.text = 'Senhas devem conter no mínimo 10 e no máximo 1500 caracteres.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}