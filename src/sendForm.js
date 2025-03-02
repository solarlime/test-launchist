import isValid from './isValid.js';

/**
 * Функция для подготовки данных и отправки на сервер
 * @param formName string
 * @returns { Promise<any> }
 */
async function sendForm(formName) {
  const data = Array.from(document.forms[formName])
    // Убираем кнопку из массива
    .filter((input) => input.name)
    // Проверяем поля
    .map((input, i, array) => {
      const value = input.value.trim();
      if (value || input.required) {
        if (value) {
          if (isValid(value, input.name)) {
            return input;
          }
          throw new Error(`${input.name} is invalid!`);
        }
        if (input.required && !value) {
          throw new Error(`${input.name} is empty!`);
        }
      }
      return input;
    })
    // Собираем данные
    .reduce((accumulator, current) => {
      return { ...accumulator, [current.name]: current.value.trim() };
    }, {});

  if (+data.budget_min > +data.budget_max) {
    throw new Error('budget_min must be less than budget_max!');
  }

  const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export default sendForm;
