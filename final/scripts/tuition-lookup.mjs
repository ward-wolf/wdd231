import { getUserCountry } from "./geolocation.mjs";

// URL for the tuition rates data file
const tuitionRatesUrl = "data/tuition-rates.json";

// Find the visitor's country and its listed tuition rate
export async function getCountryTuition() {
    try {
        const country = await getUserCountry();
        const response = await fetch(tuitionRatesUrl);
        if (response.ok) {
            const rates = await response.json();
            const match = rates.find((rate) => rate.country === country);
            return match || null;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
