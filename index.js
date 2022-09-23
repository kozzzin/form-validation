/* eslint-disable max-classes-per-file */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('yeah!!');
    const formController = new FormController();
    formController.run();
  },
);

class FormController {
  constructor(formID = '#forma') {
    this.formID = formID;
    this.form = document.querySelector(this.formID);
  }

  run() {
    this.form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
      },
    );
  }

  addValidator(e) {

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
