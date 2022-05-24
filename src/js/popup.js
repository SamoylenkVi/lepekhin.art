const keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
};

const PHONE_CODE = '+7';



const regexPhoneInput = new RegExp(/\+?7?\(?([0-9]{0,3})\)?([0-9]{0,3})\-?([0-9]{0,2})\-?([0-9]{0,2})/, 'g');
const page = document.querySelector('body');
const buttonPopupOpen = document.querySelector('.offer-button')
const popupFormApplication = document.querySelector('.popup')
const popupButtonClose = popupFormApplication.querySelector('.popup__button-close');
// const popupPhone = popupFormApplication.querySelector('#tel');
const isPopupExist = popupFormApplication && buttonPopupOpen && popupButtonClose;


const telInputs = document.querySelectorAll('input[type=tel]');
for (let i = 0; i < telInputs.length; i++) {
    telInputs[i].addEventListener('input', function(e) {
        let cleaned = e.target.value.replace(/\D/g, '');
        if (['7','8'].indexOf(cleaned[0]) >= 0) {
            cleaned = cleaned.substring(1);
        }
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            e.target.value = ['+7 ', match[1], ' ', match[2], '-', match[3], '-', match[4]].join('');
        }
    });
}

// const focusPhoneHandler = (evt) => {
//     if (evt.target.value.length === 0) {
//       evt.target.value = PHONE_CODE;
//     }
// };
  
// const maskPhoneHandler = (evt) => {
  
//     const [, group1, group2, group3, group4] = Array.from(evt.target.value.matchAll(regexPhoneInput))[0];
  
//     evt.target.value = PHONE_CODE;
  
//     if (group1) {
//       evt.target.value += `${group1}`;
//     }
  
//     if (group2) {
//       evt.target.value += `${group2}`;
//     }
  
//     if (group3) {
//       evt.target.value += `-${group3}`;
//     }
  
//     if (group4) {
//       evt.target.value += `-${group4}`;
//     }
// };
  
// if (popupPhone) {
//     popupPhone.addEventListener('focus', focusPhoneHandler);
//     popupPhone.addEventListener('input', maskPhoneHandler);
// }
  
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