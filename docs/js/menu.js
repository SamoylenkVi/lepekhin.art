const page = document.querySelector('.page');
const header = document.querySelector('.page-header');
const buttonMenuHendler = header.querySelector('.page-header__open-menu');
if (buttonMenuHendler) {
    buttonMenuHendler.addEventListener('click',() => {
        page.classList.toggle('page--open-navigation');
        header.classList.toggle('page-header--open');
    });
}
