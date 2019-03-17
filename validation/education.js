const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.institution = !isEmpty(data.institution) ? data.institution : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if (Validator.isEmpty(data.institution)) {
    errors.institution = 'Instituição de Ensino é Obrigatório para o Cadastro de Educação.'
  }

  // if (Validator.isEmpty(data.degree)) {
  //   errors.degree = 'Formação é Obrigatório para o Cadastro de Educação.'
  // }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Área de Formação é Obrigatório para o Cadastro de Educação.'
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'Data de Início é Obrigatório para o Cadastro de Experiência.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}