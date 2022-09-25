/* eslint-disable arrow-body-style */
/* eslint-disable no-empty */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const formController = new FormController();
    formController.run();
  },
);

class FormController {
  constructor(formID = '#forma') {
    this.formID = formID;
    this.form = document.querySelector(this.formID);
    this.inputFields = document.querySelectorAll('input');
  }

  run() {
    this.form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
      },
    );

    this.form.querySelector('[type="submit"]').disabled = true;

    document.querySelector('form')
      .addEventListener(
        'submit',
        (event) => {
          sayThanx(event);
        },
      );

    document.querySelectorAll('input').forEach(
      (input) => {
        const events = [
          'keyup',
          'change',
          'blur',
        ];
        events.forEach(
          (event) => {
            input.addEventListener(
              event,
              (e) => {
                if (!hasErrors(e, input)) {
                  showOKStatus(e);
                }
                checkForm(e, input);
              },
            );
          },
        );
      },
    );
  }

  addValidator(
    target,
    event,
    callback,
  ) {
    return Validator.create(
      target,
      event,
      callback,
    );
  }
}

class Validator {
  constructor(
    target,
    event,
    callback,
  ) {
    this.target = target;
    this.event = event;
    this.callback = callback;
  }

  static create(
    target,
    event,
    callback,
  ) {
    return new Validator(target, event, callback);
  }

  run() {
    document.querySelector(this.target)
      .addEventListener(
        this.event,
        (e) => {
          this.callback(e);
        },
      );
  }
}

function hasErrors(e, input) {
  removeErrorMessage(e, input);
  removeOKMessage(e, input);

  if (hasEmptyField(e, input)) {
    return true;
  }

  if (hasInputError(e, input)) {
    return true;
  }

  if ((input.id === 'passConfirm')
      && (passNotConfirmed(e, input))) {
    return true;
  }

  return false;
}

function removeErrorMessage(e, input) {
  try {
    e.target.parentNode.querySelector('.wrong').remove();
  } catch {

  }
}

function removeOKMessage(e, input) {
  try {
    e.target.parentNode.classList.remove('ok');
  } catch {

  }
}

function hasInputError(e, input) {
  if (!input.validity.valid) {
    showError(e, e.target.getAttribute('data-error'));
    return true;
  }
  return false;
}

function hasEmptyField(e, input) {
  if (input.value === '') {
    e.target.setCustomValidity('it\'s empty');
    showError(e, 'required field');
    return true;
  }
  e.target.setCustomValidity('');
  e.target.checkValidity();
  return false;
}

function passNotConfirmed(e) {
  const pass = document.querySelector('#pass');
  const passConfirm = document.querySelector('#passConfirm');

  if (pass.value !== passConfirm.value) {
    passConfirm.setCustomValidity('not equal to password');
    showError(e, 'not equal to password');
    return true;
  }

  passConfirm.setCustomValidity('');
  passConfirm.checkValidity();
  return false;
}

function showOKStatus(event, message = '✓') {
  event.target.parentNode
    .classList.add('ok');
}

function showError(event, message) {
  const div = document.createElement('div');
  div.className = 'wrong';
  div.innerText = message;
  div.style = `
      left: ${event.target.offsetLeft}px;
      width: ${event.target.offsetWidth}px;
      top: ${event.target.offsetTop + event.target.offsetHeight}px;
  `;
  event.target.parentNode.append(div);
}

function checkForm() {
  const inputFields = Array.from(document.querySelectorAll('input'));
  const everyIsValidated = inputFields.every(
    (input) => {
      if (input.type != 'submit') {
        // console.log(
        //   input.id,
        //   input.value !== '',
        //   input.validity.valid,
        // );
        return input.value !== '' && input.validity.valid;
      }
      return true;
    },
  );

  if (everyIsValidated) {
    document.querySelector('input[type="submit"]').disabled = false;
  } else {
    document.querySelector('input[type="submit"]').disabled = true;
  }
}

function sayThanx(event) {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const response = `
  <strong>Thank you!</strong><br>
  Check your information<br>
  one more time:<br>
  <strong>Email:</strong> ${formData.get('email')}<br>
  <strong>Country:</strong> ${formData.get('country')}<br>
  <strong>ZIP:</strong> ${formData.get('zip')}<br><br>
  `;
  // eslint-disable-next-line no-param-reassign
  event.target.innerHTML = response;
}
