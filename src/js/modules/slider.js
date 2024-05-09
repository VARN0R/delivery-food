function slider({slide, container, current, total, next, prev, wrapper, field}) {
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

    let counter = 1;
    let switchSlideBeforeClick = setInterval(() => {
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
        })
        dots[counterSlider - 1].style.opacity = 1;
    }, 2000)

    function isDoubleDigitNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    slides.forEach(item => {
        item.style.width = widthSlidesWrapper;
    })

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
        `
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    slidesField.style.width = (slides.length * 100) + "%";
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
        })
        dots[counterSlider - 1].style.opacity = 1;
        clearInterval(switchSlideBeforeClick);
    })


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
        })
        dots[counterSlider - 1].style.opacity = 1;
        clearInterval(switchSlideBeforeClick);
    })

    dots.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            offset = +widthSlidesWrapper.replace(/\D/g, '') * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            curNumSlide.innerText = isDoubleDigitNumber(index + 1);

            dots.forEach(item => {
                item.style.opacity = 0.5;
            })
            item.style.opacity = 1;

        })
    })
}

export default slider;