import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30304003-9c44aaf784222fe9e4a4dbbed';

export default async function fetchImages(inputValue, pageNumber) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=40`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        Notiflix.Notify.failure('error');
    }
};