const header = document.querySelector('.page-header')
const buttonMenuHendler = header.querySelector('.page-header__open-menu')
if (buttonMenuHendler) {
    buttonMenuHendler.addEventListener('click',() => {
        header.classList.toggle('page-header--open')
    })
}