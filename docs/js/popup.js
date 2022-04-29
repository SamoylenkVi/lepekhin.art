const keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
};

const ValidationError = {
  tel: [
    { 
      regExp: /^(?!\s*$).+/, 
      errorMessage: 'Укажите телефон для связи'
    },
    {
      regExp: /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      errorMessage: 'Верный формат — 8 999 999 99 99'
    }
  ],
  name: [
    {
      regExp: /^(?!\s*$).+/, 
      errorMessage: 'Укажите, как к вам обращаться'
    }
  ],
  email: [
    {
      regExp: /^(?!\s*$).+/,
      errorMessage: 'Укажите почту для связи'
    },
    {
      regExp: /^(?:[-a-z\d\+\*\/\?!{}~_%&'=^$#]+(?:\.[-a-z\d\+\*\/\?!{}~_%&'=^$#]+)*)@(?:[-a-z\d_]+\.){1,60}[a-z]{2,6}$/,
      errorMessage: 'Верный формат — ivan@goo.ru',
    }
  ]
};


const PHONE_CODE = '+7(';

const InvalidInput = new Map();
const ErrorPopup = new Map ();

const regexPhoneInput = new RegExp(/\+?7?\(?([0-9]{0,3})\)?([0-9]{0,3})\-?([0-9]{0,2})\-?([0-9]{0,2})/, 'g');
const page = document.querySelector('body');
const buttonPopupOpen = document.querySelector('.offer-button')
const popupFormApplication = document.querySelector('.popup')
const popupButtonClose = popupFormApplication.querySelector('.popup__button-close');
const popupForm = popupFormApplication.querySelector('form')
const popupPhone = popupForm.querySelector('#tel');
const validatedElements = popupForm.querySelectorAll('[data-validate]');
const isPopupExist = popupFormApplication && buttonPopupOpen && popupButtonClose;


const focusPhoneHandler = (evt) => {
    if (evt.target.value.length === 0) {
      evt.target.value = PHONE_CODE;
    }
};
  
const maskPhoneHandler = (evt) => {
  
    const [, group1, group2, group3, group4] = Array.from(evt.target.value.matchAll(regexPhoneInput))[0];
  
    evt.target.value = PHONE_CODE;
  
    if (group1) {
      evt.target.value += group1;
    }
  
    if (group2) {
      evt.target.value += `)${group2}`;
    }
  
    if (group3) {
      evt.target.value += `-${group3}`;
    }
  
    if (group4) {
      evt.target.value += `-${group4}`;
    }
};
  
if (popupPhone) {
    popupPhone.addEventListener('focus', focusPhoneHandler);
    popupPhone.addEventListener('input', maskPhoneHandler);
}
  
const openPopupHandler = (evt) => {
    evt.preventDefault();
  
    page.style.overflow = 'hidden';
    popupFormApplication.classList.remove('popup--closed')
  

    popupButtonClose.addEventListener('click', closePopupHandler);
    document.addEventListener('keydown', escapeKeydownHandler);
};
  
const closePopupHandler = (evt) => {
    evt.preventDefault();
  
    page.style.overflow = 'auto';
    popupFormApplication.classList.add('popup--closed')
  
  
    popupButtonClose.removeEventListener('click', closePopupHandler);
    document.removeEventListener('keydown', escapeKeydownHandler);
  
};
  
const escapeKeydownHandler = (evt) => {
    if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
      closePopupHandler(evt);
    }
};
  

buttonPopupOpen.addEventListener('click', openPopupHandler);

popupForm.setAttribute('novalidate', '');


const validateFormField = (input) => { 
  const inputValidations = ValidationError[input.dataset.validate];

  for (let i = 0; i < inputValidations.length; i++) { // выведет 0, затем 1, затем 2
    const {errorMessage, regExp} = inputValidations[i];
    const isElementValid = input.value.search(regExp) !== -1;
    
    if (!isElementValid) {
      return errorMessage;
    } 
  }

  return '';
};

const showErrorPopup = (hookElement, textContent, isPopupExist) => {
  if (isPopupExist) {
    const errorMessagePopup = ErrorPopup.get(hookElement)
    errorMessagePopup.textContent = textContent
  } else {
    const errorMessagePopup = document.createElement('span')
    errorMessagePopup.classList.add('error-message')
    errorMessagePopup.textContent = textContent
    const parentWrapper = hookElement.parentNode
    parentWrapper.appendChild(errorMessagePopup)
    ErrorPopup.set(hookElement, errorMessagePopup);
  }
};

const deleteErrorPopup = (hookElement) => {
  if (ErrorPopup.has(hookElement)) {
      const errorMessagePopup = ErrorPopup.get(hookElement)
      errorMessagePopup.remove();
      ErrorPopup.delete(hookElement);
  }
};

const inputHandler = ({ target: element }) => {  
  const isInvalidLastCheck = InvalidInput.has(element); 
  const errorMessage = validateFormField(element); 
  const previousErrorMessage = isInvalidLastCheck
    ? InvalidInput.get(element)
    : null;

  
  if (!isInvalidLastCheck && errorMessage) {
    InvalidInput.set(element, errorMessage); 
    showErrorPopup(element, errorMessage, isInvalidLastCheck);

    element.addEventListener("input", inputHandler);
  }

  
  if (
    isInvalidLastCheck &&
    errorMessage &&
    previousErrorMessage !== errorMessage
  ) {
    InvalidInput.set(element, errorMessage);
    showErrorPopup(element, errorMessage, isInvalidLastCheck);
  }

  
  if (isInvalidLastCheck && !errorMessage) {
    InvalidInput.delete(element);
    deleteErrorPopup(element);

    element.removeEventListener("input", inputHandler);
  }
};

const submitFormHandler = (evt) => {
  validatedElements.forEach((validatedElement) => {
    inputHandler({target: validatedElement})
  })
  if (InvalidInput.size !== 0) {
    evt.preventDefault();
  }
};

popupForm.addEventListener('submit', submitFormHandler);


 