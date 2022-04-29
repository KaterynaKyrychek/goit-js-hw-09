import getRandomHexColor from '';
const btnStart = document.querySelector('button[data-start]');
const btnFinish = document.querySelector('button[data-finish]');
const bodyColor = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStart.addEventListener("click", () => {

})