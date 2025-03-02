import './style.css';
import sendForm from './sendForm.js';
import createForm from './createForm.js';

const app = document.querySelector('#app');

try {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL);
  if (response.ok) {
    const requirements = await response.json();

    const formName = 'application';
    let form = createForm(requirements, formName);
    app.innerHTML = form.outerHTML;
    // Чистим память от объекта формы
    form = null;

    const addedButton = document.querySelector('button');
    addedButton.addEventListener('click', async (event) => {
      event.preventDefault();

      try {
        const result = await sendForm(formName);
        console.info('Received: %o', result);
        alert('Success! Check console for the result');
      } catch (error) {
        alert(error.message);
      }
    });
  } else {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }
} catch (error) {
  app.innerHTML = `<p>Error: ${error.message}</p>`;
}
