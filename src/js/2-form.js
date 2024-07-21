const formFeedback = 'feedback-form-state';
const from = document.querySelector('.feedback-form');
const formEmail = document.querySelector('[name="email"]');
const formMessage = document.querySelector('[name="message"]');

const localState = JSON.parse(localStorage.getItem(formFeedback));
if (localState) {
  for (const key of Object.keys(localState)) {
    document.querySelector(`[name="${key}"]`).value = localState[key] ?? '';
  }
}

from.addEventListener('input', saveToLocalStorage);

from.addEventListener('submit', event => {
  event.preventDefault();

  if (validateForm(event)) {
    console.log('submit', localState);

    localStorage.removeItem(formFeedback);
    event.target.reset();
  }
});

function saveToLocalStorage(event) {
  const formStateData = {
    email: localState?.email || '',
    message: localState?.message || '',
  };
  formStateData[event.target.name] = event.target.value.trim();
  localStorage.setItem(formFeedback, JSON.stringify(formStateData));
}

function validateForm() {
  let isValid = true;
  if (!formEmail.value) {
    showError(formEmail);
    isValid = false;
  }
  if (!formMessage.value) {
    showError(formMessage);
    isValid = false;
  } else if (formMessage.value || formEmail.value) {
    if (formEmail.value) {
      showSuccess(formEmail);
    }
    if (formMessage.value) {
      showSuccess(formMessage);
    }
    if (formEmail.value && formMessage.value) {
      isValid = true;
    }
  }
  return isValid;
}

function showError(input) {
  input.classList.add('error');
}

function showSuccess(input) {
  input.classList.remove('error');
}
