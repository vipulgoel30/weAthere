"use strict";
const search = document.querySelector('.search');
const searchPanel = document.querySelector('.search-panel');
const searchIconContainer = document.querySelector('.search-icon-container');
const crossIconContainer = document.querySelector('.cross-icon-container');


// showing of search panel
searchIconContainer.addEventListener('click', () => {
    searchPanel.style.width = "18rem";
    searchPanel.focus();

    search.style.border = "1.5px solid #222";
    searchIconContainer.classList.toggle('hidden');
    crossIconContainer.classList.toggle('hidden');

});

// hidding serach panel
searchPanel.addEventListener('focusout', () => {
    console.log("hello");
    searchPanel.style.width = '0';
    search.style.border = '';
    searchIconContainer.classList.toggle('hidden');
    crossIconContainer.classList.toggle('hidden');
})

