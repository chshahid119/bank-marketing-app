'use strict';

const scrollBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
scrollBtn.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // In updated Js pageXOffset--->ScrollX
  // In updated Js pageYOffset--->Scrolly
  console.log('Curent Scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // Old way to scrool
  //   window.scrollTo(
  //     s1coords.left + window.scrollX,
  //     s1coords.top + window.scrollY
  //   );
  // it is also a old way to scroll but better than previous
  // in this we also give behavior how to scroll
  //   window.scrollTo({
  //     left: s1coords.left + window.scrollX, //pageXOffset--->ScrollX
  //     top: s1coords.top + window.scrollY, //pageYOffset--->Scrolly
  //     behavior: 'smooth',
  //   });

  // It is updated way to do scroll
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(sibblings);
    const logo = link.closest('.nav').querySelector('img');

    sibblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5)); //Now the this keyword binds with that opacity

nav.addEventListener('mouseout', handleHover.bind(1)); //Now the this keyword binds with that opacity

// Make Our Navigation to sticky

// const initialCordinates = section1.getBoundingClientRect();
// console.log(initialCordinates);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCordinates.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const footerCopyright = document.querySelector('.footer__copyright');
// const YaxixCordinate = section1.getBoundingClientRect();

// const callBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const options = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(callBack, options);
// observer.observe(section1);

const header = document.querySelector('.header');
const navigationHeight = nav.getBoundingClientRect().height;

const stickyNavigation = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0.2,
  rootMargin: `-${navigationHeight}px`,
});
observer.observe(header);

//Reveal All the sections when we came on the particular section
const allsections = document.querySelectorAll('.section');

// console.log(allsections);
const showSections = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // after this to stop observing those we can use unobserve function or method
  observer.unobserve(entry.target);
};
const sectionsObserver = new IntersectionObserver(showSections, {
  root: null,
  threshold: 0.15,
});
allsections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
});
const LoadImages = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

//lazy images loading in Js
const imgs = document.querySelectorAll('img[data-src]');
// console.log(imgs);

const imgsLoadObserver = new IntersectionObserver(LoadImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgs.forEach(img => {
  imgsLoadObserver.observe(img);
});

// slider compoent

const slides = document.querySelectorAll('.slide');
const leftSliderBtn = document.querySelector('.slider__btn--left');
const rightSliderBtn = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currSlide = 0;
const maxSlide = slides.length;

const goToSlide = slide => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = () => {
  if (currSlide == maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activateDot(currSlide);
};
const prevSlide = () => {
  if (currSlide == 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
  activateDot(currSlide);
};
rightSliderBtn.addEventListener('click', nextSlide);
leftSliderBtn.addEventListener('click', prevSlide);

//Add keyboard events to move slider left and right
document.addEventListener('keydown', function (e) {
  // console.log(e);
  // if (e.key === 'ArrowRight') {
  //   nextSlide();
  // }
  // if (e.key === 'ArrowLeft') {
  //   prevSlide();
  // }
  //Same work also done using short circuiting (Advance Way to do that)
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && nextSlide();
});

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide=${i}></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('Dom content loaded', e);
});
