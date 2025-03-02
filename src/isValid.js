import isEmail from 'validator/es/lib/isEmail.js';
import isMobilePhone from 'validator/es/lib/isMobilePhone.js';
import isNumeric from 'validator/es/lib/isNumeric.js';
import isAlphanumeric from 'validator/es/lib/isAlphanumeric.js';

/**
 * Функция валидации. Использует библиотеку validator
 * @param value string (строка, очищенная от пробелов)
 * @param type string (список ключей объекта requirements)
 * @returns { boolean }
 */
function isValid(value, type) {
  switch (type) {
    case 'email':
      return isEmail(value);
    case 'budget_min':
    case 'budget_max':
      return isNumeric(value) && value > 0;
    case 'phone':
      return isMobilePhone(value);
    default:
      return isAlphanumeric(value, 'en-US', { ignore: '. ,' });
  }
}

export default isValid;
