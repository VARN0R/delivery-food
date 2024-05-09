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


    if (localStorage.getItem("theme") !== null){
        setTheme(localStorage.getItem("theme"));
    } else {
        setTheme("night");
    }

    switchBtn.addEventListener("change", () => {
        toggleTheme();
    })
}

export default switcher;