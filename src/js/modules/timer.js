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
        }
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
export default timer;