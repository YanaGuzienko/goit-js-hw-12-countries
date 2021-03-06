import url from './js/config';
import debounce from 'lodash.debounce';
import countriesTmp from './templates/countries.hbs';
import countriesListTmp from './templates/countries-list.hbs';
import './styles.css';

const { BASE_URL } = url;

const liRef = document.querySelector('#list');
const inputRef = document.querySelector('.input-text');

// function fetchCountries(e) {
//   const name = e.target.value.toLowerCase();
//   console.log(name);
//   fetch(`${BASE_URL}${name}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(countries => {
//       countries.forEach(country => {
//         liRef.insertAdjacentHTML(
//           'afterbegin',
//           `<h2>${country.name}</h2><li>${country.capital}</li><li>${country.population}</li><li>${country.languages}</li><img src="${country.flag}" width="40" height="40"/>`,
//         );
//         console.log(country);
//       });

//       console.log(countries);
//     });
// }

function fetchCountries(e) {
  const name = e.target.value.toLowerCase();
  console.log(name);
  fetch(`${BASE_URL}${name}`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      console.log(countries.length);
      countCountry(countries);
      // const result = countries.map(country => countriesTmp(country)).join('');
      // liRef.innerHTML = countriesTmp(countries);
      //   liRef.insertAdjacentHTML(
      //   'beforeend',
      //   countriesTmp(countries),
      // );
      // console.log(result);
    });
  // .then(countries => {
  //   liRef.insertAdjacentHTML('beforeend', countries);
  // });
}
// fetchCountries();
inputRef.addEventListener('input', debounce(fetchCountries, 500));

function countCountry(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    liRef.innerHTML = countriesListTmp(countries);
  } else {
    liRef.innerHTML = countriesTmp(countries);
  }
}
