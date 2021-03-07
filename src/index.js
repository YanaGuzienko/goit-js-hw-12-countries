import url from './js/config';
import debounce from 'lodash.debounce';
import countriesTmp from './templates/countries.hbs';
import countriesListTmp from './templates/countries-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import './styles.css';

const { BASE_URL } = url;

const liRef = document.querySelector('#list');
const inputRef = document.querySelector('.input-text');

defaultModules.set(PNotifyMobile, {});

function fetchCountries(e) {
  const name = e.target.value.toLowerCase();

  fetch(`${BASE_URL}${name}`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      renderCountry(countries);
    })
    .catch(console.log('Oops..An error occured, please try again'));
}

inputRef.addEventListener('input', debounce(fetchCountries, 1000));

function renderCountry(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    liRef.innerHTML = countriesListTmp(countries);
  } else if (countries.length === 1) {
    liRef.innerHTML = countriesTmp(countries);
    inputRef.value = '';
  } else if (countries.length > 10) {
    error({
      text: 'Too many matches found.Please enter a more specific query!',
    });
  }
}
