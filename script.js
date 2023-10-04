'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const ACCESS_KEY = 'MjEESd8_q4NObdNlkDHvsz8C9gcccJSdA-I8HmcdDPo',
        search = document.querySelector('.header__search'),
        input = document.querySelector('.header__search-input'),
        clear = document.querySelector('.header__search-clear'),
        error = document.querySelector('.header__search-error'),
        main = document.querySelector('.main'),
        items = document.querySelector('.main__items'),
        btnLoadMore = document.querySelector('.main__btn-load-more');

    let searchValue = 'spring';
    let page = 1;
    let perPage = 9;
    const orientation = 'landscape';

    let url = `https://api.unsplash.com/search/photos?query=${searchValue}&page=${page}&per_page=${perPage}&orientation=${orientation}&client_id=${ACCESS_KEY}`;

    let state = [];

    async function getData() {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.results.length) {
            error.classList.remove('header__search-error_active');
            main.classList.remove('main_p0');
            btnLoadMore.classList.remove('main__btn-load-more_dn');
            state = data.results;
            setPhotos();
        } else {
            error.classList.add('header__search-error_active');
            main.classList.add('main_p0');
            btnLoadMore.classList.add('main__btn-load-more_dn');
        }
    }

    getData();

    function renderItem() {
        return state
            .map(({ alt_description, links: { html }, urls: { regular }, user: { name } }) => {
                return `<div class="main__item">
                    <a class="main__item-link" href="${html}" target="_blank">
                        <img class="main__item-img" src="${regular}" alt="${alt_description}">
                        <span class="main__item-text">${name}</span>
                    </a>
                </div>`;
            })
            .join("");
    };

    function setPhotos() {
        items.innerHTML += renderItem();
    };

    search.addEventListener('submit', (e) => {
        getSearchImages(e);
    });

    function getSearchImages(e) {
        e.preventDefault();
        items.innerHTML = '';
        const target = e.target;
        searchValue = target.querySelector('.header__search-input').value;
        url = `https://api.unsplash.com/search/photos?query=${searchValue}&page=${page}&per_page=${perPage}&orientation=${orientation}&client_id=${ACCESS_KEY}`;
        getData();
    }

    btnLoadMore.addEventListener('click', (e) => {
        loadMore(e);
    });

    function loadMore(e) {
        e.preventDefault();
        page++;
        url = `https://api.unsplash.com/search/photos?query=${searchValue}&page=${page}&per_page=${perPage}&orientation=${orientation}&client_id=${ACCESS_KEY}`;
        getData();
    }

    clear.addEventListener('click', () => {
        input.value = '';
        input.focus();
    })
});