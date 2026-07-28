import { getUserCurrency } from "./geolocation.mjs";
import { getCountryTuition } from "./tuition-lookup.mjs";

// select HTML elements in the document
const currentTuition = document.querySelector("#current-tuition");

// Fallback tuition in USD, used if the country lookup fails
const defaultTuitionAmountUSD = 250;
const baseCurrency = "USD";

// tuitionFetch function
async function tuitionFetch(tuitionAmountUSD, targetCurrency) {
    try {
        const tuitionUrl = `https://api.frankfurter.dev/v2/rate/${baseCurrency}/${targetCurrency}`;
        const response = await fetch(tuitionUrl);
        if (response.ok) {
            const data = await response.json();
            displayTuition(data, tuitionAmountUSD, targetCurrency);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        currentTuition.textContent = "unavailable";
    }
}

// init function
async function init() {
    const targetCurrency = await getUserCurrency();
    const countryTuition = await getCountryTuition();
    const tuitionAmountUSD = countryTuition ? countryTuition.cost : defaultTuitionAmountUSD;
    tuitionFetch(tuitionAmountUSD, targetCurrency);
}

init();

// Display tuition converted to the visitor's local currency

function displayTuition(data, tuitionAmountUSD, targetCurrency) {
    const convertedAmount = (tuitionAmountUSD * data.rate).toFixed(2);
    currentTuition.textContent = `${convertedAmount} ${targetCurrency}`;
}
