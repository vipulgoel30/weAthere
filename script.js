// const data = async () => {
//     const test = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=28.6469655&lon=77.093263&appid=0fc5c1db9e7b33ad675891ece04a54a6');
//     console.log(test.json());
// }
// const lang = navigator.language;
// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=sri%20nagar&appid=0fc5c1db9e7b33ad675891ece04a54a6
// `).then((resp) => {
//     return (resp.json());
// }).then((temp) => { console.log(temp); });
// // data();
// navigator.geolocation.watchPosition((data) => {
//     console.log(data);
// });

// "use strict";
// import loc from './scripts/getLocation.js';

// console.log(loc());
// let test;
// const temp = (data) => {
//     test = data;
// }
// navigator.geolocation.getCurrentPosition(temp);
// console.log(test);
// console.log(navigator.geolocation.getCurrentPosition((data) => {
//     console.log(data);
// }, () => { }, {
//     maximumAge: 5000,
//     enableHighAccuracy: true,
// }));
// console.log(navigator.geolocation.getCurrentPosition((data) => {
//     console.log(data);
// }, () => { }, {
//     maximumAge: 5000,
//     enableHighAccuracy: false,
// }));


"use strict";
import './scripts/loaderDotes.js';//for the loader dotes of the getting data

let test;
// for getting location
const error = (e) => {
    console.log(e);
}
const success = (data) => {
    test = data;
}
navigator.geolocation.watchPosition((data) => { console.log(data.coords.latitude,data.coords.longitude); }, error, {
    timeout: 5000,
    enableHighAccuracy: true,
    maximumAge:Infinity,
})

