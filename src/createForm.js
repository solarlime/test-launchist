/**
 * Функция создания формы по полученным данным
 * @param requirements object ({ [key: string]: 'required' | 'optional' })
 * @param formName string
 * @returns { HTMLFormElement }
 */
function createForm(requirements, formName) {
  const form = document.createElement('form');
  form.name = formName;

  /**
   * <form>
   *   <label>
   *     <span>Title</span>
   *     <input>
   *   </label>
   * </form>
   */
  const labels = Object.entries(requirements).map((field) => {
    const label = document.createElement('label');
    const title = document.createElement('span');
    title.textContent =
      // Наводим немного красоты
      field[0].slice(0, 1).toUpperCase() +
      field[0].slice(1).split('_').join(' ');
    const input = document.createElement('input');
    switch (field[0]) {
      case 'email':
        input.type = 'email';
        break;
      case 'phone':
        input.type = 'tel';
        break;
      case 'budget_min':
      case 'budget_max':
        input.type = 'text';
        input.inputMode = 'numeric';
        input.pattern = '\d*';
        break;
      default:
        input.type = 'text';
        break;
    }
    input.setAttribute('name', field[0]);
    input.setAttribute('placeholder', field[1]);
    input.required = field[1] === 'required';
    label.append(title, input);
    return label;
  });

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Send your application';

  form.append(...labels, button);
  return form;
}

export default createForm;
