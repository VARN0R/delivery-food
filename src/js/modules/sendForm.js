import {showModalThanks} from './modalWindows';
function sendForm(formsSelector) {
    const forms = document.querySelectorAll(formsSelector);

    forms.forEach((item) => {
        formSend(item);
    })

    const messages = {
        loading: "img/form/spinner.svg",
        success: "Данные успешно отправлены",
        error: "Произошла ошибка"
    }

    const postData = async (url, data) => {
        return (await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })).json()
    }

    function formSend(form) {
        form.addEventListener('submit', (e) => {
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

            const object = JSON.stringify(Object.fromEntries(formData.entries()))

            postData("http://localhost:3000/requests", object)
                .then((result) => {
                    showModalThanks(messages.success, ".modal__dialog", ".modal");
                    console.log(result);
                    statusMessage.remove();
                })
                .catch(() => {
                    showModalThanks(messages.error, ".modal__dialog", ".modal");
                })
                .finally(() => {
                    form.reset();
                })

        })
    }


}

export default sendForm;