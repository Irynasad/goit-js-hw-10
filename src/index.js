import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
import { fetchCountries } from './fetchCountries';
const URL = 'https://restcountries.com/v3.1/name/';

const getItemTemplate = ({ flags, name }) => `
    <li class="country-item" data-id=${name}>
      <img src="${flags.svg}" alt="Flag of ${name.official} width="30" height="20">
      <h1 class="country-title">${name.official}</h1>
    </li>`;

const getInfoOffItemTemplate = ({ capital, population, languages }) => `
  <p class="country-capital"><b>Capital</b>: ${capital}</p>
  <p class="country-population"><b>Population</b>: ${population}</p>
  <p class="country-languages"><b>Languages</b>: ${languages} </p></li>
  `;

const clearName = () => {
  refs.list.innerHTML = '';
  refs.div.innerHTML = '';
};

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
let countries = [];

const renderList = () => {
  console.log(countries);
  const listOfCountry = countries.map(getItemTemplate);
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', listOfCountry.join(''));
};

const renderInfo = () => {
  const infoOfCountry = countries.map(getInfoOffItemTemplate);
  refs.div.innerHTML = '';
  refs.div.insertAdjacentHTML('beforeend', infoOfCountry.join(''));
};

const onSearch = event => {
  event.preventDefault();
  let name = event.target.value.trim();
  clearName();

  if (!name) {
    return;
  }
  // fetch(
  //   `${URL}${name}?fields=name,capital,population,languages,flags`
  // )
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     return response.json();
  //   })
  fetchCountries(name)
    .then(data => {
      console.log(data);
      countries = data;
      if (countries.length >= 10) {
        return Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
      }
      if (countries.length > 2 && countries.length < 10) {
        renderList();
        return;
      }
      if (countries.length === 1) {
        renderList();
        renderInfo();
        return;
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    })
    .finally();
};

// function fetchCountries(countryName) {
//   return fetch(
//     `${URL}${countryName}?fields=name,capital,population,languages,flags`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
