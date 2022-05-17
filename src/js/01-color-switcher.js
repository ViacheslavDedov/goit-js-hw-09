const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

refs.body.classList.add('switcher');

refs.btnStart.addEventListener('click', (event) => {
    event.currentTarget.setAttribute('disabled', '');
        timerId = setInterval (() => {
            refs.body.style.backgroundColor = getRandomHexColor();}, 1000);
});

refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    refs.btnStart.removeAttribute('disabled', '');
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
