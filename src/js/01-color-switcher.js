const btnStart = document.querySelector('button[data-start]');
const btnFinish = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStart.addEventListener("click", () => {
    timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();}, 1000);
    btnStart.disabled = true;
    btnFinish.disabled = false;
});

btnFinish.addEventListener('click', () => {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnFinish.disabled = true;
});