const SLIDES_PER_PAGE = 3;

const sliderWrapper = document.querySelector('.team__list')
const sliders = document.querySelectorAll('.team_item');
const sliderButton = document.querySelector('.team__arrow');

const numberOfWindings = Math.ceil(sliders.length/SLIDES_PER_PAGE);

let i = 1;

const scrollSlider = () => {
    
    if (i < numberOfWindings) {
        console.log(i)
        sliderWrapper.style.transform = `translate3d(-${i * 100}%,0,0)`;
        i++ 
    }  else {
        sliderWrapper.style.transform = `translate3d(0,0,0)`;
        i = 1;
    }
}

sliderButton.addEventListener('click', scrollSlider)