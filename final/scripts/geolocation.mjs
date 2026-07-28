// URL for IP-based geolocation lookup
const geoUrl = "https://ipapi.co/json/";

// Cache the visitor's location in localStorage so repeat page loads
// don't have to re-fetch it every time
const cacheKey = "nta-geolocation";
const cacheDurationMs = 24 * 60 * 60 * 1000;

function loadCachedLocation() {
    try {
        const cached = JSON.parse(localStorage.getItem(cacheKey));
        if (cached && Date.now() - cached.timestamp < cacheDurationMs) {
            return cached;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

// Look up the visitor's currency and country from their IP address,
// using the cached result when it's still fresh
async function getUserLocation() {
    const cached = loadCachedLocation();
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(geoUrl);
        if (response.ok) {
            const data = await response.json();
            const location = {
                currency: data.currency,
                country: data.country_name,
                timestamp: Date.now(),
            };
            localStorage.setItem(cacheKey, JSON.stringify(location));
            return location;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        return { currency: "USD", country: null };
    }
}

export async function getUserCurrency() {
    const location = await getUserLocation();
    return location.currency;
}

export async function getUserCountry() {
    const location = await getUserLocation();
    return location.country;
}
