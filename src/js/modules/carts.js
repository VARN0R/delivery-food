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
            element.innerHTML =
                `<div class="menu__item">
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

    const getData = async (url) => {
        const response = await fetch(url);

        if (!response.ok || response.status !== 200) {
            throw new Error(`couldnt get data on ${url}, error ${response.status}`);
        }

        return response;
    }

    getData("http://localhost:3000/menu")
        .then((res) => res.json())
        .then(data => {
            data.forEach((item, i) => {
                const {img, altimg, title, descr, price} = item;

                new Cart(img, title, descr, price, ".menu .container").render();
            })
        })
        .catch(error => {
            new Cart("img/form/error.jpg", "Меню не загрузилось", "Произошла ошибка. Скорее всего не запущен json-server.", "-", ".menu .container").render();
        })

}

export default carts;