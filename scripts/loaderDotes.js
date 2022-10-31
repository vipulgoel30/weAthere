const loaderDotes = document.querySelector('.loader-dotes');
setInterval(() => {
    let count = 1;
    loaderDotes.textContent = '';
    const interval = setInterval(() => {
        loaderDotes.textContent = ''.padStart(count, '.');
        count++;
    }, 400);
    setTimeout(() => {
        clearInterval(interval);
    },1200)
}, 1200)