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

const InvalidInput = new Map();
const ErrorPopup = new Map ();


const popupForm = document.querySelector('.popup__order-form');
const emailForm = document.querySelector('.subscribe-list__form')


popupForm.setAttribute('novalidate', '');

const validateFormField = (input) => { 
    const inputValidations = ValidationError[input.dataset.validate];
  
    for (let i = 0; i < inputValidations.length; i++) {
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
    const validatedElements = evt.target.querySelectorAll('[data-validate]');

    validatedElements.forEach((validatedElement) => {
      inputHandler({target: validatedElement})
    })
    if (InvalidInput.size !== 0) {
      evt.preventDefault();
    }
  };
  
  popupForm.addEventListener('submit', submitFormHandler);
  
  if (emailForm) {
    emailForm.setAttribute('novalidate', '');
    emailForm.addEventListener('submit', submitFormHandler);
}

  
  
   