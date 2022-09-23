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

    document.querySelectorAll('input').forEach(
      (input) => {
        input.addEventListener(
          'keyup',
          (e) => {
            inputCheck(
              e,
              input,
            );
          },
        );

        input.addEventListener(
          'blur',
          (e) => {
            inputCheck(
              e,
              input,
            );
            if (input.value === '') {
              e.target.setCustomValidity('its empty');
              try {
                e.target.parentNode.querySelector('.wrong').remove();
              } catch {

              }
              showError(
                e,
                'required field',
              );
            } else {
              e.target.setCustomValidity('');
            }
            checkForm();
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

function showError(
  event,
  message,
) {
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
  const form = document.querySelector('form');

  const every = Array.from(document.querySelectorAll('input'))
    .every((input) => {
      return input.checkValidity();
    });

  if (form.checkValidity()) {
    document.querySelector('[type="submit"]').disabled = false;
  }
}

function inputCheck(
  e,
  input,
) {
  try {
    e.target.parentNode.querySelector('.wrong').remove();
  } catch {

  }
  if (!input.validity.valid) {
    showError(
      e,
      e.target.getAttribute('data-error'),
    );
  }
}

// check two passwords
// check all form fields and leave submit in disabled state
// BUG: if field is not blured it's not required
// maybe add data-required field: and use it to validate
// BUG: when bluring, red label stays
// refactoring: now have mess
// add mark: completed, everything is good with this field!