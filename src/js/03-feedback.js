// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище,
//  коли користувач щось друкує.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
//  у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок
//  "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля
//  форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email,
// message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту
//  і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const STORAGE_KEY = 'feedback-form-state';

  let formData = {};

  const feedbackFormRef = document.querySelector('.feedback-form');

  feedbackFormRef.addEventListener(
    'input',
    throttle(getFeedbackFormState, 500)
  );

  function getFeedbackFormState(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
  populateForm();

  feedbackFormRef.addEventListener('submit', onFormSubmit);

  function onFormSubmit(evt) {
    evt.preventDefault();
    if (feedbackFormRef[0].value === '' || feedbackFormRef[1].value === '') {
      alert('Треба заповнити всі поля форми');
    } else {
      console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
      feedbackFormRef.reset();
      Object.getOwnPropertyNames(formData).forEach(key => (formData[key] = ''));
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function populateForm() {
    if (localStorage.getItem(STORAGE_KEY)) {
      formData = JSON.parse(localStorage.getItem(STORAGE_KEY));

      for (let key in formData) {
        feedbackFormRef.elements[key].value = formData[key];
      }
    }
  }
});
