const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  console.log('data', data)

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  console.log('data', data)


  // handle + skills é o único required na modelagem
  // if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
  //   errors.handle = 'Handle precisa ter entre 2 e 40 caracteres.'
  // }

  // if (Validator.isEmpty(data.handle)) {
  //   errors.handle = 'Handle de perfil é obragatório.'
  // }

  // if (Validator.isEmpty(data.skills)) {
  //   errors.skills = 'Insira pelo menos uma habilidade...'
  // }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Endereço Inválido"
    }
  }

  // if (!isEmpty(data.youtube)) {
  //   if (!Validator.isURL(data.youtube)) {
  //     errors.youtube = "Endereço Inválido"
  //   }
  // }

  // if (!isEmpty(data.linkedin)) {
  //   if (!Validator.isURL(data.linkedin)) {
  //     errors.linkedin = "Endereço Inválido"
  //   }
  // }

  // if (!isEmpty(data.instagram)) {
  //   if (!Validator.isURL(data.instagram)) {
  //     errors.instagram = "Endereço Inválido"
  //   }
  // }

  // if (!isEmpty(data.facebook)) {
  //   if (!Validator.isURL(data.facebook)) {
  //     errors.facebook = "Endereço Inválido"
  //   }
  // }

  console.log("ERRORS", errors)
  console.log("IS EMPTY - ERRORS", isEmpty(errors))
  return {
    errors,
    isValid: isEmpty(errors)
  }
}