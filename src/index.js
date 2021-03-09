import api from './js/fetchCountries';
import debounce from 'lodash.debounce';
import countriesTmp from './templates/countries.hbs';
import countriesListTmp from './templates/countries-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import './styles.css';
defaultModules.set(PNotifyMobile, {});

const liRef = document.querySelector('#list');
const inputRef = document.querySelector('.input-text');

function getCountries(e) {
  const name = e.target.value.toLowerCase().trim();

  if (name === '') {
    return;
  }
  api
    .fetchCountries(e)
    .then(countries => {
      renderCountry(countries);
    })
    .catch(err => {
      console.log(err);
    });
}

function onlyLi(e) {
  if (e.target.nodeName === 'LI') {
    api.fetchCountryOfList(e).then(countries => renderCountry(countries));
  } else {
    return;
  }
}

function renderCountry(countries) {
  liRef.innerHTML = '';
  if (countries.length >= 2 && countries.length <= 10) {
    liRef.innerHTML = countriesListTmp(countries);
  } else if (countries.length === 1) {
    liRef.innerHTML = countriesTmp(countries);
  } else if (countries.length > 10) {
    error({
      text: 'Too many matches found.Please enter a more specific query!',
    });
  }
}

inputRef.addEventListener('input', debounce(getCountries, 1000));
liRef.addEventListener('click', onlyLi);

// function fetchCountries(e) {
//   const name = e.target.value.toLowerCase();

//   fetch(`${BASE_URL}${name}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(countries => {
//       renderCountry(countries);
//     })
//     .catch(console.log('Oops..An error occured, please try again'));
// }
