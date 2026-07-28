import { getUserCountry } from "./geolocation.mjs";

// Create variables for the data file URL and the draft storage key
// (enroll-draft.js owns this key; read here too since this field's
// options load asynchronously, after enroll-draft.js's own restore
// attempt would have already run and found an empty <select>)

const countriesUrl = "data/countries.json";
const draftKey = "nta-enroll-draft";

const countrySelect = document.querySelector("#country");

// async function to fetch the country list and populate the dropdown

async function populateCountries(countriesDataUrl) {
    if (!countrySelect) return;

    const response = await fetch(countriesDataUrl);
    const countries = await response.json();

    countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    selectDefaultCountry(countries);
}

populateCountries(countriesUrl);

// Prefer a saved draft over the geolocation guess, since the visitor
// already told us their answer once

async function selectDefaultCountry(countries) {
    let savedCountry = null;
    try {
        const draft = JSON.parse(localStorage.getItem(draftKey));
        savedCountry = draft && draft.country;
    } catch (error) {
        console.log(error);
    }

    if (savedCountry && countries.includes(savedCountry)) {
        countrySelect.value = savedCountry;
        return;
    }

    const detectedCountry = await getUserCountry();
    if (detectedCountry && countries.includes(detectedCountry)) {
        countrySelect.value = detectedCountry;
    }
}
