// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#weather-desc");

// URL for today's weather API
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=32.32&lon=-102.55&units=imperial&appid=8edd9f9c81eb739c008fc5e786989923";

// URL for 5 day / 3 hour forecast API
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=32.32&lon=-102.55&units=imperial&appid=8edd9f9c81eb739c008fc5e786989923";

// APIfetch function
async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        captionDesc.textContent = "Weather unavailable";
    }
}

// forecastFetch function
async function forecastFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        document.querySelectorAll(".forecast-desc").forEach((desc) => {
            desc.textContent = "Unavailable";
        });
    }
}

apiFetch();
forecastFetch();

// Display today's weather results

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = `${desc}`;
}

// Display 3-day forecast results

function displayForecast(data) {
    const forecastDays = document.querySelectorAll(".forecast-day");

    forecastDays.forEach((dayElement) => {
        const offset = Number(dayElement.getAttribute("data-days-from-today"));
        const targetDate = addDays(today, offset);
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, "0");
        const day = String(targetDate.getDate()).padStart(2, "0");
        const targetDateString = `${year}-${month}-${day}`;

        // Pick the forecast entry closest to noon on the target date
        const dayEntries = data.list.filter((entry) => entry.dt_txt.startsWith(targetDateString));
        const entry = dayEntries.find((e) => e.dt_txt.includes("12:00:00")) || dayEntries[0];
        if (!entry) return;

        const icon = dayElement.querySelector(".forecast-icon");
        const temp = dayElement.querySelector(".forecast-temp");
        const desc = dayElement.querySelector(".forecast-desc");

        icon.setAttribute("src", `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`);
        icon.setAttribute("alt", entry.weather[0].description);
        temp.innerHTML = `${Math.round(entry.main.temp)}&deg;F`;
        desc.textContent = entry.weather[0].description;
    });
}
