import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchImages from './fetchImages';

let pageNumber = 1;


const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('#search-box');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
    e.preventDefault();
    pageNumber = 1;
    galleryEl.innerHTML = '';
    const searchQuery = inputEl.value.trim();

    if (searchQuery === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return
    } else {
        const data = await fetchImages(searchQuery, pageNumber);

        if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {

        renderGallary(data.hits);
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            loadMoreBtnEl.classList.remove('is-hidden');
    };
}
}

async function onLoadMore(){
    pageNumber += 1;
    const searchQuery = inputEl.value.trim();       

    const data = await fetchImages(searchQuery, pageNumber);

    if (data.hits.length === 0) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        loadMoreBtnEl.classList.add('is-hidden');
    } else {

    renderGallary(data.hits);
    // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    };
}

function renderGallary(data) {
    const markup = data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card"><a class="link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info"><p class="info-item"><b>Likes</b>${likes}</p><p class="info-item"><b>Views</b>${views}</p>
        <p class="info-item"><b>Comments</b>${comments}</p><p class="info-item"><b>Downloads</b>${downloads}</p></div></div>`
    }).join("");

    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh()
};