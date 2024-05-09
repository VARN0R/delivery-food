function calc() {
    const result = document.querySelector(".calculating__result span"),
        inputs = document.querySelectorAll(".calculating__choose_medium input");
    let sex = "female", ratio = 1.375, age, height, weight;



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
    })

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
            })

            return localStorage.getItem(data);
        }
    }

    sex = getItemFromLocalStorage(".calculating__choose-item", "calculating__choose-item_active", "sex");
    ratio = getItemFromLocalStorage(".calculating__choose-item", "calculating__choose-item_active", "ratio");
    if(!sex) {
        sex = "female";
        ratio = 1.375;
    }

    calcTotalCalories();


    function deleteNotDigits(str) {
        str.replace(/\D/g, "")
    }
    function getCaloriesInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        document.querySelector(parentSelector).addEventListener("click", (event) => {
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
                })

                event.target.classList.add(activeClass);

                calcTotalCalories();
            }
        })
    }

    getCaloriesInformation("#gender", "calculating__choose-item_active");
    getCaloriesInformation(".calculating__choose_big", "calculating__choose-item_active");

    inputs.forEach(item => {
        item.addEventListener("input", () => {
            if(item.value.match(/\D/g)) {
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
        })
    })
    function calcTotalCalories() {

        if (height && age && weight && sex) {
            if(sex === "female") {
                result.textContent = Math.round((447.6 + (9.2 * Number(weight)) + (3.1 * Number(height)) - (4.3 * Number(age))) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * Number(weight)) + (4.8 * Number(height)) - (5.7 * Number(age))) * ratio);
            }
        } else {
            result.textContent = "___";
        }
    }


}

export default calc;