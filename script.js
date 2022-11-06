"use strict";

import key from './config.js';//contains the api key
import dotesInterval from './scripts/loaderDotes.js';//for the loader dotes of the getting data
import { kelvinToCelsius, kelvinToFahr, showTempData } from './scripts/conversions.js';

import './scripts/searchPanel.js'
let location;
let tempData;
let tempState = 'celsius';

// for the removal of loader node
const removeLoaderNode = (state) => {
    const loaderNode = document.querySelector('.loader-container');

    const loaderContent = document.querySelector('.loader-content').childNodes[0];
    const bodyContainer = document.querySelector('.body-container');

    if (state === 'location accessed') {
        loaderContent.textContent = "Getting data";
    } else {
        loaderContent.textContent = "Denied Location";
    }

    //making sure that the loader is show for atleast 1s to get all the data assembled 
    // if at start error access denied then immediately remove the loader
    setTimeout(() => {
        clearInterval(dotesInterval);//clearing dotes interval for start
        loaderNode.remove();
        // bodyContainer.style.display = 'block';
        bodyContainer.style.opacity = 1;
    }, state === 'location accessed' ? 0 : 0);
}


// for the success of geolocation
const successLocation = (data) => {
    if (!location || location.latitude !== data.latitude || location.longitude !== data.longitude) {
        if (!location) {
            removeLoaderNode('location accessed');
        }
        location = data;

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${data.coords.latitude}&lon=${data.coords.longitude}&limit=5&appid=${key}`).then(
            (locations) => {
                return locations.json();

            }
        ).then((locationJson) => {

            showLocation(locationJson[0]);
            getTempData(locationJson[0]);
        })

    }
}


// for the error of geolocation
const errorLocation = (error) => {
    console.log(error);
    removeLoaderNode('loaction denied');
}


//getting location with parameter start(tells whether getting location at start)
function getLocation() {
    navigator.geolocation.watchPosition(successLocation, errorLocation, {
        timeout: 5000,
        enableHighAccuracy: true,
        maximumAge: 1000
    })
}

getLocation();



// showing of data
function getTempData(data) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${key}`).then((data) => {
        return data.json();
    }).then((dataJson) => {
        tempData = dataJson;

        showWeatherImage(dataJson);
        showCurrentMinMaxTemp(dataJson);
    })


}

function showLocation(data) {
    // console.log(data);
    const locationContent = document.querySelector('.location-content');
    locationContent.textContent = `${data.name ? data.name.split(' ').slice(0, 2).join(' ') : 'null'}${data.state ? `, ${data.state}` : ''}${data.country ? `, ${data.country}` : ''}`;
}
function showWeatherImage(data) {
    const weatherImage = document.querySelector('.weather-image');
    if (data?.weather?.[0]?.icon) {
        weatherImage.src = ` http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    } else {
        const hours = Date.now();
        const sunrise = data?.sys?.sunrise ? new Date((data.sys.sunrise) * 1000) : new Date().setHours(6, 0, 0);
        const sunset = data?.sys?.sunset ? new Date((data.sys.sunset) * 1000) : new Date().setHours(18, 0, 0);

        if (hours > sunrise && hours < sunset) {
            weatherImage.src = ` http://openweathermap.org/img/wn/01d@4x.png`;
        } else {
            weatherImage.src = ` http://openweathermap.org/img/wn/01n@4x.png`;
        }
    }
}

function showCurrentMinMaxTemp(data) {
    console.log(data);
    const tempDataMin = document.querySelector('.temp-data-min');
    const tempDataMax = document.querySelector('.temp-data-max');
    const tempCurrent = document.querySelector('.temp-current');

    showTempData(tempDataMax, tempState, data?.main?.temp_max);
    showTempData(tempDataMin, tempState, data?.main?.temp_min);
    showTempData(tempCurrent, tempState, data?.main?.temp);
}




// toggle tempState
const celsius = document.querySelector('.celsius');
const fahrenheit = document.querySelector('.fahrenheit');

celsius.addEventListener('click', () => {
    tempState = 'celsius';
    celsius.classList.toggle('toggle-temp-active');
    fahrenheit.classList.toggle('toggle-temp-active');
    showCurrentMinMaxTemp(tempData);
})
fahrenheit.addEventListener('click', () => {
    tempState = 'fahrenheit';
    fahrenheit.classList.toggle('toggle-temp-active');
    celsius.classList.toggle('toggle-temp-active');
    showCurrentMinMaxTemp(tempData);
})


// if (window.localStorage) {
//     localStorage.setItem('vipul', 'goel')
//     console.log(localStorage);
// }
