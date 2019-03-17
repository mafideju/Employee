const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle deve ter entre 2 e 40 caracteres';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle para Perfil é obrigatório. Assim você será identificado mais facilmente.';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Insira ao menos uma habilidade.';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'URL Inválida';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'URL Inválida';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'URL Inválida';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'URL Inválida';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'URL Inválida';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'URL Inválida';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
