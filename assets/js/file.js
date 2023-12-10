"use strict";
///////////////////////////////////////
// Modal window
const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const scrollTo = document.querySelector(".btn--scroll-to");
const sectionTo = document.querySelector("#section--1");
const allLinks = document.querySelector(".nav__links");
const tapBtns = document.querySelectorAll(".operations__tab");
const tapContenar = document.querySelector(".operations__tab-container");
const contents = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const section = document.querySelectorAll(".section");

//oppingg
const opening = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//closing
const closing = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((mov) => {
  mov.addEventListener("click", opening);
});
btnCloseModal.addEventListener("click", closing);
overlay.addEventListener("click", closing);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closing();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closing();
  }
});

//scrolll to feature
scrollTo.addEventListener("click", () => {
  sectionTo.scrollIntoView({ behavior: "smooth" });
});

// scroll smooth
allLinks.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tapping button
tapContenar.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //حمايه الايرور لو مضغطش
  if (!clicked) return;
  //remove all
  tapBtns.forEach((acc) => acc.classList.remove("operations__tab--active"));
  contents.forEach((acc) =>
    acc.classList.remove("operations__content--active")
  );

  //add
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// hover nav bar
const hoverBtn = function (e, valu) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const allLink = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");
    allLink.forEach(function (acc) {
      if (acc !== link) {
        acc.style.opacity = valu;
      }
      logo.style.opacity = valu;
    });
  }
};

nav.addEventListener("mouseover", function (e) {
  hoverBtn(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  hoverBtn(e, 1);
});

// fixed header up code
const margnee = nav.getBoundingClientRect().height;
const calback = (entres) => {
  const [entre] = entres;
  if (!entre.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${margnee}px`,
};
const observer = new IntersectionObserver(calback, options);
observer.observe(header);

// anemation text dowen to up
const callbackFun = (entres, observer) => {
  const [entree] = entres;
  if (!entree.isIntersecting) return;
  entree.target.classList.remove("section--hidden");
  observer.unobserve(entree.target);
};

const observerSection = new IntersectionObserver(callbackFun, {
  root: null,
  threshold: 0.15,
});
section.forEach((section) => {
  observerSection.observe(section);
  section.classList.add("section--hidden");
});

//lazy image
const functionLazy = (entres, observer) => {
  const [entre] = entres;
  if (!entre.isIntersecting) return;
  entre.target.src = entre.target.dataset.src;
  entre.target.addEventListener("load", () => {
    entre.target.classList.remove("lazy-img");
  });
};
const allSrc = document.querySelectorAll("img[data-src]");
const observerLazy = new IntersectionObserver(functionLazy, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
allSrc.forEach((acc) => {
  observerLazy.observe(acc);
});

//slider

const slider = function () {
  const slider = document.querySelector(".slider");
  const allSlide = document.querySelectorAll(".slide");
  const previous = document.querySelector(".slider__btn--left");
  const next = document.querySelector(".slider__btn--right");
  const dot = document.querySelector(".dots");
  const lastValue = allSlide.length;
  let currentSlide = 0;

  //function loop
  const loopSlide = function (current) {
    allSlide.forEach((acc, i) => {
      acc.style.transform = `translateX(${100 * (i - current)}%)`;
    });
  };
  const addDiv = function () {
    allSlide.forEach((_, i) => {
      dot.insertAdjacentHTML(
        "beforeend",
        `
    <button class='dots__dot' data-slide="${i}"></button>
    `
      );
    });
  };

  //fun active dots
  const activeDots = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((acc) => {
      acc.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // display first sec
  //0% 100% 200% 300%
  addDiv();
  loopSlide(0);
  activeDots(0);
  //next fun
  const addNext = function () {
    if (currentSlide === lastValue - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    loopSlide(currentSlide);
    activeDots(currentSlide);
    // -100% 0% 100% 200%  .....
  };

  //previos fun
  const addPrevios = function () {
    if (currentSlide === 0) {
      currentSlide = lastValue - 1;
    } else {
      currentSlide--;
    }
    loopSlide(currentSlide);
    activeDots(currentSlide);
  };

  //four dots
  dot.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      const click = e.target.dataset.slide;
      loopSlide(click);
      activeDots(click);
    }
  });
  next.addEventListener("click", addNext);
  previous.addEventListener("click", addPrevios);
  document.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key === "ArrowRight") addNext();
    if (e.key === "ArrowLeft") addPrevios();
  });
};
slider();
