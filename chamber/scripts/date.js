// Date and last modified

const today = new Date();

document.querySelector("#currentyear").textContent = today.getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Record when the form was loaded, if this page has a timestamp field
const timestampField = document.querySelector("#timestamp");
if (timestampField) {
    timestampField.value = today.toISOString();
}

// Return a new Date offset by a number of days from a given date
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Fill in event dates based on each element's data-days-from-today attribute
const eventDateElements = document.querySelectorAll(".event-date");
eventDateElements.forEach((element) => {
    const offset = Number(element.getAttribute("data-days-from-today"));
    const eventDate = addDays(today, offset);
    element.textContent = eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
});

// Fill in forecast day labels based on each element's data-days-from-today attribute
const forecastDayElements = document.querySelectorAll(".forecast-day");
forecastDayElements.forEach((element) => {
    const offset = Number(element.getAttribute("data-days-from-today"));
    const forecastDate = addDays(today, offset);
    const label = element.querySelector(".forecast-label");
    if (label) {
        label.textContent = forecastDate.toLocaleDateString("en-US", {
            weekday: "long",
        });
    }
});