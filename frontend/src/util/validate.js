/* eslint-disable eqeqeq */
import { addMonths } from 'date-fns';
import { formatCpf } from './format';

export const validateSpecialities = (values) => {
  const errors = {};

  if (!values.speciality) {
    errors.speciality = 'Escolha uma especialidade';
  }

  return errors;
};

const validateCpf = (data) => {
  let addition;
  let rest;
  let i;

  addition = 0;

  const cpf = formatCpf(data);

  for (i = 1; i <= 9; i += 1) addition += +cpf.substring(i - 1, i) * (11 - i);
  rest = (addition * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != +cpf.substring(9, 10)) return false;

  addition = 0;
  for (i = 1; i <= 10; i += 1) addition += +cpf.substring(i - 1, i) * (12 - i);
  rest = (addition * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != +cpf.substring(10, 11)) return false;

  return true;
};

export const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Esse campo é obrigatório';
  } else if (values.name.length < 3) {
    errors.name = 'Mínimo de 3 letras';
  } else if (!/^([^0-9]*)$/.test(values.name)) {
    errors.name = 'Números não são permitidos';
  }

  if (!values.email) {
    errors.email = 'Esse campo é obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'O formato precisa ser "example@email.com"';
  }

  if (!values.date_time) {
    errors.date_time = 'Esse campo é obrigatório';
  } else if (new Date(values.date_time) < new Date()) {
    errors.date_time = 'Datas passadas não são permitidas';
  } else if (new Date(values.date_time) > addMonths(new Date(), 3)) {
    errors.date_time = 'Agendamentos podem ocorrer em até 3 meses';
  }

  if (!values.cpf) {
    errors.cpf = 'Esse campo é obrigatório';
  } else if (!validateCpf(values.cpf)) {
    errors.cpf = 'Formate de cpf inválido';
  }

  if (!values.birthdate) {
    errors.birthdate = 'Esse campo é obrigatório';
  }

  if (!values.source) {
    errors.source = 'Esse campo é obrigatório';
  }

  return errors;
};
