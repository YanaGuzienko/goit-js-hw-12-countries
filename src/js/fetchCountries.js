import url from './config';
const { BASE_URL } = url;

const api = {
  fetchCountries(e) {
    const name = e.target.value.toLowerCase();

    return fetch(`${BASE_URL}${name}`).then(response => response.json());
  },

  fetchCountryOfList(e) {
    const targetLi = e.target;
    const liContent = targetLi.textContent;

    return fetch(`${BASE_URL}${liContent}`).then(response => response.json());
  },
};

export default api;
