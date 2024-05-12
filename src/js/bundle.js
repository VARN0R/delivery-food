/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector(".calculating__result span"),
    inputs = document.querySelectorAll(".calculating__choose_medium input");
  let sex = "female",
    ratio = 1.375,
    age,
    height,
    weight;
  inputs.forEach(item => {
    if (localStorage.getItem("height") != null && item.id === "height") {
      item.value = localStorage.getItem("height");
      height = localStorage.getItem("height");
    }
    if (localStorage.getItem("weight") != null && item.id === "weight") {
      item.value = localStorage.getItem("weight");
      weight = localStorage.getItem("weight");
    }
    if (localStorage.getItem("age") != null && item.id === "age") {
      item.value = localStorage.getItem("age");
      age = localStorage.getItem("age");
    }
  });
  function getItemFromLocalStorage(mainClass, activeClass, data) {
    if (localStorage.getItem(data) !== null) {
      const elements = document.querySelectorAll(mainClass);
      elements.forEach(item => {
        if (item.getAttribute("data-ratio") !== localStorage.getItem("ratio") && item.id !== localStorage.getItem("sex")) {
          item.classList.remove(activeClass);
        }
        if (item.getAttribute("data-ratio") === localStorage.getItem(data)) {
          item.classList.add(activeClass);
        }
        if (item.id === localStorage.getItem(data)) {
          item.classList.add(activeClass);
        }
      });
      return localStorage.getItem(data);
    }
  }
  sex = getItemFromLocalStorage(".calculating__choose-item", "calculating__choose-item_active", "sex");
  ratio = getItemFromLocalStorage(".calculating__choose-item", "calculating__choose-item_active", "ratio");
  if (!sex) {
    sex = "female";
    ratio = 1.375;
  }
  calcTotalCalories();
  function deleteNotDigits(str) {
    str.replace(/\D/g, "");
  }
  function getCaloriesInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    document.querySelector(parentSelector).addEventListener("click", event => {
      if (event.target.classList.contains("calculating__choose-item")) {
        if (event.target.getAttribute("data-ratio")) {
          event.target.classList.add(activeClass);
          ratio = +event.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          sex = event.target.id;
          event.target.classList.add(activeClass);
          localStorage.setItem("sex", sex);
        }
        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        event.target.classList.add(activeClass);
        calcTotalCalories();
      }
    });
  }
  getCaloriesInformation("#gender", "calculating__choose-item_active");
  getCaloriesInformation(".calculating__choose_big", "calculating__choose-item_active");
  inputs.forEach(item => {
    item.addEventListener("input", () => {
      if (item.value.match(/\D/g)) {
        item.style.border = "1px solid red";
      } else {
        item.style.border = "none";
      }
      if (item.id === "height") {
        height = item.value;
        localStorage.setItem("height", height);
      }
      if (item.id === "weight") {
        weight = item.value;
        localStorage.setItem("weight", weight);
      }
      if (item.id === "age") {
        age = item.value;
        localStorage.setItem("age", age);
      }
      calcTotalCalories();
    });
  });
  function calcTotalCalories() {
    if (height && age && weight && sex) {
      if (sex === "female") {
        result.textContent = Math.round((447.6 + 9.2 * Number(weight) + 3.1 * Number(height) - 4.3 * Number(age)) * ratio);
      } else {
        result.textContent = Math.round((88.36 + 13.4 * Number(weight) + 4.8 * Number(height) - 5.7 * Number(age)) * ratio);
      }
    } else {
      result.textContent = "___";
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/carts.js":
/*!*********************************!*\
  !*** ./src/js/modules/carts.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function carts() {
  class Cart {
    constructor(src, name, descr, price, parentElement) {
      this.src = src;
      this.name = name;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentElement);
    }
    render() {
      const element = document.createElement('div');
      element.innerHTML = `<div class="menu__item">
                    <img src="${this.src}" alt="vegy">
                    <h3 class="menu__item-subtitle">${this.name}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> BYN/день</div>
                    </div>
                </div>`;
      this.parent.append(element);
    }
  }
  const getData = async url => {
    const response = await fetch(url);
    if (!response.ok || response.status !== 200) {
      throw new Error(`couldnt get data on ${url}, error ${response.status}`);
    }
    return response;
  };
  getData("http://localhost:3000/menu").then(res => res.json()).then(data => {
    data.forEach((item, i) => {
      const {
        img,
        altimg,
        title,
        descr,
        price
      } = item;
      new Cart(img, title, descr, price, ".menu .container").render();
    });
  }).catch(error => {
    new Cart("img/form/error.jpg", "Меню не загрузилось", "Произошла ошибка. Скорее всего не запущен json-server.", "-", ".menu .container").render();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (carts);

/***/ }),

/***/ "./src/js/modules/modalWindows.js":
/*!****************************************!*\
  !*** ./src/js/modules/modalWindows.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showModalThanks: () => (/* binding */ showModalThanks)
/* harmony export */ });
function modalWindows(modalSelector, btnsModalSelector) {
  const modal = document.querySelector(modalSelector);
  const btnsModal = document.querySelectorAll(`${btnsModalSelector}`);
  btnsModal.forEach((item, i) => {
    item.addEventListener("click", () => {
      modal.style.display = "block";
      clearInterval(modalTimer);
    });
  });
  modal.addEventListener("click", event => {
    let target = event.target;
    if (target && target.classList.contains("modal") || target.getAttribute('data-close') === '') {
      modal.style.display = "none";
    }
  });
  const modalTimer = setTimeout(() => {
    modal.style.display = "block";
  }, 50000);
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      modal.style.display = "block";
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}
function showModalThanks(text, modalElement, modalSelector) {
  const modal = document.querySelector(modalSelector);
  const elem = document.querySelector(modalElement);
  elem.style.display = "none";
  modal.style.display = "block";
  const divModalThanks = document.createElement('div');
  divModalThanks.classList.add("modal__dialog");
  divModalThanks.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${text}</div>
        </div>        
        `;
  modal.append(divModalThanks);
  setTimeout(() => {
    divModalThanks.remove();
    modal.style.display = "none";
    elem.style.display = "block";
  }, 2000);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindows);


/***/ }),

/***/ "./src/js/modules/sendForm.js":
/*!************************************!*\
  !*** ./src/js/modules/sendForm.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalWindows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindows */ "./src/js/modules/modalWindows.js");

function sendForm(formsSelector) {
  const forms = document.querySelectorAll(formsSelector);
  forms.forEach(item => {
    formSend(item);
  });
  const messages = {
    loading: "img/form/spinner.svg",
    success: "Данные успешно отправлены",
    error: "Произошла ошибка"
  };
  const postData = async (url, data) => {
    return (await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })).json();
  };
  function formSend(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.classList.add('status');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const object = JSON.stringify(Object.fromEntries(formData.entries()));
      postData("http://localhost:3000/requests", object).then(result => {
        (0,_modalWindows__WEBPACK_IMPORTED_MODULE_0__.showModalThanks)(messages.success, ".modal__dialog", ".modal");
        console.log(result);
        statusMessage.remove();
      }).catch(() => {
        (0,_modalWindows__WEBPACK_IMPORTED_MODULE_0__.showModalThanks)(messages.error, ".modal__dialog", ".modal");
      }).finally(() => {
        form.reset();
      });
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  slide,
  container,
  current,
  total,
  next,
  prev,
  wrapper,
  field
}) {
  const slides = Array.from(document.querySelectorAll(slide));
  const slider = document.querySelector(container);
  const curNumSlide = document.getElementById(current);
  const totalNumSlide = document.getElementById(total);
  const nextBtnSlider = document.querySelector(next);
  const prevBtnSlider = document.querySelector(prev);
  let counterSlider = 1;
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const widthSlidesWrapper = window.getComputedStyle(slidesWrapper).width;
  function isDoubleDigitNumber(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  slides.forEach(item => {
    item.style.width = widthSlidesWrapper;
  });
  slider.style.position = "relative";
  const indicators = document.createElement("ol");
  const dots = [];
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  slidesField.style.width = slides.length * 100 + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  totalNumSlide.innerText = isDoubleDigitNumber(slides.length);
  curNumSlide.innerText = isDoubleDigitNumber(counterSlider);
  let offset = 0;
  nextBtnSlider.addEventListener("click", () => {
    if (offset === +widthSlidesWrapper.replace(/\D/g, '') * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +widthSlidesWrapper.replace(/\D/g, '');
    }
    counterSlider++;
    if (counterSlider > Number(totalNumSlide.innerText)) {
      counterSlider = 1;
    }
    curNumSlide.innerText = isDoubleDigitNumber(counterSlider);
    slidesField.style.transform = `translateX(-${offset}px)`;
    dots.forEach(item => {
      item.style.opacity = 0.5;
    });
    dots[counterSlider - 1].style.opacity = 1;
    clearInterval(switchSlideBeforeClick);
  });
  prevBtnSlider.addEventListener("click", () => {
    if (offset === 0) {
      offset = +widthSlidesWrapper.replace(/\D/g, '') * (slides.length - 1);
    } else {
      offset -= +widthSlidesWrapper.replace(/\D/g, '');
    }
    counterSlider--;
    if (counterSlider < 1) {
      counterSlider = Number(totalNumSlide.innerText);
    }
    curNumSlide.innerText = isDoubleDigitNumber(counterSlider);
    slidesField.style.transform = `translateX(-${offset}px)`;
    dots.forEach(item => {
      item.style.opacity = 0.5;
    });
    dots[counterSlider - 1].style.opacity = 1;
    clearInterval(switchSlideBeforeClick);
  });
  dots.forEach((item, index) => {
    item.addEventListener("click", e => {
      const slideTo = e.target.getAttribute("data-slide-to");
      offset = +widthSlidesWrapper.replace(/\D/g, '') * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      curNumSlide.innerText = isDoubleDigitNumber(index + 1);
      dots.forEach(item => {
        item.style.opacity = 0.5;
      });
      item.style.opacity = 1;
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/smoothScroll.js":
/*!****************************************!*\
  !*** ./src/js/modules/smoothScroll.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function smoothScroll() {
  const links = document.querySelectorAll('.header__link');
  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      console.log(targetId);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (smoothScroll);

/***/ }),

/***/ "./src/js/modules/switcher.js":
/*!************************************!*\
  !*** ./src/js/modules/switcher.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function switcher() {
  const theme = document.querySelector(".night-theme");
  const switchBtn = document.querySelector(".switch");
  function setTheme(themeName) {
    if (themeName === "night") {
      localStorage.setItem("theme", themeName);
      theme.classList.add("night-theme");
      document.getElementById('slider').checked = false;
    } else {
      localStorage.setItem("theme", themeName);
      theme.classList.remove("night-theme");
      document.getElementById('slider').checked = true;
    }
  }
  function toggleTheme() {
    if (localStorage.getItem("theme") === "night") {
      setTheme("light");
    } else if (localStorage.getItem("theme") === "light") {
      setTheme("night");
    }
  }
  if (localStorage.getItem("theme") !== null) {
    setTheme(localStorage.getItem("theme"));
  } else {
    setTheme("night");
  }
  switchBtn.addEventListener("change", () => {
    toggleTheme();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (switcher);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  const tabsParent = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabContents = document.querySelectorAll(".tabcontent");
  function hideContent() {
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
    for (let i = 0; i < tabContents.length; i++) {
      tabs[i].classList.remove("tabheader__item_active");
    }
  }
  function showTabs(i) {
    tabs[i].classList.add("tabheader__item_active");
    tabContents[i].style.display = "block";
  }
  hideContent();
  showTabs(0);
  let counter = 1;
  let switchTabsBeforeClick = setInterval(() => {
    hideContent();
    showTabs(counter);
    counter++;
    if (counter === 4) {
      counter = 0;
    }
  }, 2000);
  tabsParent.addEventListener('click', event => {
    let target = event.target;
    clearInterval(switchTabsBeforeClick);
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target.innerText === item.innerText) {
          hideContent();
          showTabs(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadlineData, timerSelector) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date().getTime();
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor(t / (1000 * 60 * 60) % 24);
    let minutes = Math.floor(t / (1000 * 60) % 60);
    let seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function setTime(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    let timeInterval = setInterval(updateTime, 1000);
    function updateTime() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = t.days;
      hours.innerHTML = t.hours;
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;
      if (t.total < 0) {
        clearInterval(timeInterval);
        const timerElement = document.querySelector(timerSelector);
        timerElement.innerHTML = ``;
        timerElement.innerHTML = `
                    <div class="timer__block">
                    <span id="days">0</span>
                    дней
                </div>
                <div class="timer__block">
                    <span id="hours">0</span>
                    часов
                </div>
                <div class="timer__block">
                    <span id="minutes">0</span>
                    минут
                </div>
                <div class="timer__block">
                    <span id="seconds">0</span>
                    секунд
                </div>
                `;
      }
    }
  }
  setTime(timerSelector, deadlineData);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_carts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/carts */ "./src/js/modules/carts.js");
/* harmony import */ var _modules_modalWindows__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modalWindows */ "./src/js/modules/modalWindows.js");
/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/sendForm */ "./src/js/modules/sendForm.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_switcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/switcher */ "./src/js/modules/switcher.js");
/* harmony import */ var _modules_smoothScroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/smoothScroll */ "./src/js/modules/smoothScroll.js");











window.addEventListener('DOMContentLoaded', () => {
  // realization tabs
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();

  // realization timer
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])("2024-12-03", '.timer');

  // work with modal windows
  (0,_modules_modalWindows__WEBPACK_IMPORTED_MODULE_3__["default"])('.modal', '[data-modal]');

  // realization carts uses classes
  (0,_modules_carts__WEBPACK_IMPORTED_MODULE_2__["default"])();

  // realization sending form on the server
  (0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_4__["default"])('form');

  // realization warning user through modal window

  // realization slider with animation
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    slide: ".offer__slide",
    container: ".offer__slider",
    current: "current",
    total: "total",
    next: ".offer__slider-next",
    prev: ".offer__slider-prev",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });

  // realization calculator of calories
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_switcher__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_smoothScroll__WEBPACK_IMPORTED_MODULE_8__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map