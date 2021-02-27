// For more infos, see: https://github.com/jquense/yup/blob/master/src/locale.js
import { setLocale } from 'yup';

const translation = {
  mixed: {
    default: 'O campo ${path} é inválido',
    required: 'O campo ${path} é obrigatório',
    oneOf: 'O campo ${path} deve ser um dos seguintes valores: ${values}',
    notOneOf:
      'O campo ${path} não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    length: 'O campo ${path} deve ter exatamente ${length} caracteres',
    min: 'O campo ${path} deve ter pelo menos ${min} caracteres',
    max: 'O campo ${path} deve ter no máximo ${max} caracteres',
    email: 'O campo ${path} deve ser um endereço de e-mail válido.',
    url: 'O campo ${path} deve ter um formato de URL válida',
    trim: 'O campo ${path} não deve conter espaços no início ou no fim.',
    lowercase: 'O campo ${path} deve estar em maiúsculo',
    uppercase: 'O campo ${path} deve estar em minúsculo',
  },
  number: {
    min: 'O campo ${path} deve ter no mínimo ${min} caracteres',
    max: 'O campo ${path} deve ter no máximo ${max} caracteres',
    lessThan: 'O campo ${path} deve ser menor que ${less}',
    moreThan: 'O campo ${path} deve ser maior que ${more}',
    notEqual: 'O campo ${path} não pode ser igual à ${notEqual}',
    positive: 'O campo ${path} deve ser um número posítivo',
    negative: 'O campo ${path} deve ser um número negativo',
    integer: 'O campo ${path} deve ser um número inteiro',
  },
  date: {
    min: 'O campo ${path} deve ser maior que a data ${min}',
    max:
      'O campo ${path} deve possuir uma data igual ou menor que a data da entrevista',
  },
  array: {
    min: 'O campo ${path} deve ter no mínimo ${min} itens',
    max: 'O campo ${path} deve ter no máximo ${max} itens',
  },
};

setLocale(translation);
