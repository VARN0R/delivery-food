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
    }, 2000)

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;
        clearInterval(switchTabsBeforeClick);
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target.innerText === item.innerText) {
                    hideContent();
                    showTabs(i);
                }
            })
        }
    })

}

export default tabs;