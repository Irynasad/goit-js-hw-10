const URL = '`https://restcountries.com/v3.1/name/';

export function fetchCountries(countryName) {
  return fetch(
    `${URL}/${countryName}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
