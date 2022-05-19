const showreelVideoWrapper = document.querySelector('.showreel-video');
const showreelButton = document.querySelector('.showreel__button');
const  showreelVideo = showreelVideoWrapper.querySelector('.video__media');
const page = document.querySelector('body');

if (showreelVideoWrapper) {
    const closeShowreelButton = showreelVideoWrapper.querySelector('.showreel-video__button-close');

   const showShowreelHandler = () => {
        page.style.overflow = 'hidden';
        closeShowreelButton.addEventListener('click', closeShowreelHandler);
        showreelVideoWrapper.classList.remove('showreel-video--closed');
    }

    const closeShowreelHandler = (evt) => {
        evt.preventDefault();
      
        page.style.overflow = 'auto';
        showreelVideoWrapper.classList.add('showreel-video--closed');
      
        showreelVideo.src = showreelVideo.src;
      
        closeShowreelButton.removeEventListener('click', closeShowreelHandler);
    };

    showreelButton.addEventListener('click', showShowreelHandler);
}
