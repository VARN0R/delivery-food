"use strict";

import tabs from "./modules/tabs";
import calc from "./modules/calc";
import carts from "./modules/carts";
import modalWindows from "./modules/modalWindows";
import sendForm from "./modules/sendForm";
import slider from "./modules/slider";
import timer from "./modules/timer";
import switcher from "./modules/switcher";
import smoothScroll from "./modules/smoothScroll";

window.addEventListener("DOMContentLoaded", () => {
  // realization tabs
  tabs();

  // realization timer
  timer("2026-01-01", ".timer");

  // work with modal windows
  modalWindows(".modal", "[data-modal]");

  // realization carts uses classes
  carts();

  // realization sending form on the server
  sendForm("form");

  // realization warning user through modal window

  // realization slider with animation
  slider({
    slide: ".offer__slide",
    container: ".offer__slider",
    current: "current",
    total: "total",
    next: ".offer__slider-next",
    prev: ".offer__slider-prev",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });

  // realization calculator of calories
  calc();

  switcher();

  smoothScroll();
});
