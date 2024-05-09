function modalWindows(modalSelector, btnsModalSelector) {
    const modal = document.querySelector(modalSelector);
    const btnsModal = document.querySelectorAll(`${btnsModalSelector}`);

    btnsModal.forEach((item, i) => {
        item.addEventListener("click", () => {
            modal.style.display = "block";
            clearInterval(modalTimer);
        })
    })

    modal.addEventListener("click", (event) => {
        let target = event.target;
        if (target && target.classList.contains("modal") || target.getAttribute('data-close') === '') {
            modal.style.display = "none";
        }
    })

    const modalTimer = setTimeout(() => {
        modal.style.display = "block";
    }, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modal.style.display = "block";
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll)
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
        `

    modal.append(divModalThanks);

    setTimeout(() => {
        divModalThanks.remove();
        modal.style.display = "none";
        elem.style.display = "block";
    }, 2000);
}

export default modalWindows;
export {showModalThanks};
