"use strict";
const showTempData = (node, unit, data) => {
    if (unit === 'celsius') {
        node.childNodes[0].textContent = kelvinToCelsius(data);
        node.childNodes[1].textContent = '°C';
    } else {
        node.childNodes[0].textContent = kelvinToFahr(data);
        node.childNodes[1].textContent = '°F';
    }
}

const kelvinToCelsius = (temp) => {
    return Math.trunc((temp - 273.15));
}
const kelvinToFahr = (temp) => {
    return Math.trunc(((temp - 273.15) * (9 / 5) + 32));
}
export { kelvinToCelsius, kelvinToFahr, showTempData }

