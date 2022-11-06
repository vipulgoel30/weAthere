"use strict";
const loaderDotes = document.querySelector('.loader-dotes');
const loaderDotesFunc = () => {
    let count = 1;
    setTimeout(() => {
        clearInterval(interval);
    }, 700);
    loaderDotes.textContent = '';
    const interval = setInterval(() => {
        loaderDotes.textContent = ''.padStart(count, '.');
        // console.log(count);
        count++;
    }, 200);
}
loaderDotesFunc();
const dotesInterval = setInterval(loaderDotesFunc, 700);
export default dotesInterval;