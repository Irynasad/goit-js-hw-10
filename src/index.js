import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/';
const refs = {
  input: document.querySelector('#search-box'),
};

const getItemTemplate = ({ country }) => `
    <li class="country-item">
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official} height="30" width="40">
      <h1 class="country-title">${country.name.official}}</h1>
    </li>`;

const getInfoOffItemTemplate = ({ country }) => `
  <p class="country-capital"><b>Capital</b>: ${country.capital}</p>
  <p class="country-population"><b>Population</b>: ${country.population}</p>
  <p class="country-languages"><b>Languages</b>: ${country.languages} </p></li>`;

let countres = [];

fetch(`${URL}v3.1/name/sw`);
fetch(
  `${URL}v2/{service}?fields=name.official,capital,population,flags.svg,languages`
)
  .then(resp => resp.json())
  .then(coutres => {
    const markup = getItemTemplate(coutres);
    if (countres.length === 1) {
      const markupInfo = getInfoOffItemTemplate(coutres);
    }
    console.log(coutres);
    console.log(markupInfo);
  })
  .catch(error => {
    console.log(error);
  });

// const onSearch = event => {
//   event.preventDefault();
//   //   refs.input.value = event.currentTarget.value;
//   const value = event.target.value;

//   console.log('value:', value);
// };
// refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
