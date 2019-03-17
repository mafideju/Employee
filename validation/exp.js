const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if (Validator.isEmpty(data.title)) {
    errors.title = 'Titulo é Obrigatório para o Cadastro de Experiência.'
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Empresa é Obrigatório para o Cadastro de Experiência.'
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'Data de Início é Obrigatório para o Cadastro de Experiência.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}