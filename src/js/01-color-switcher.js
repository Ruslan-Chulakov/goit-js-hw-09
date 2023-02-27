const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const bodyRef = document.body;

const startBtnListener = startBtnRef.addEventListener('click', onStartBtnClick);
const stopBtnListener = stopBtnRef.addEventListener('click', onStopBtnClick);

stopBtnRef.disabled = true;
let changeColorIntervalId = null;

function onStartBtnClick() {
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;

    changeColorIntervalId = setInterval(changeBodyColor, 1000);    
};

function onStopBtnClick() {
    startBtnRef.disabled = false;
    stopBtnRef.disabled = true;

    clearInterval(changeColorIntervalId);
};

// change body color function
function changeBodyColor() {
    bodyRef.style.backgroundColor = `${getRandomHexColor()}`;
}

// color generator
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };


