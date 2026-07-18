import placesOfInterest from "../data/places-of-interest.mjs";

const placesCards = document.querySelector("#places-cards");

placesOfInterest.forEach((place) => {
    // Create elements to add to the div.places-cards element
    let card = document.createElement("section");
    let placeGrid = document.createElement("div");
    let figure = document.createElement("figure");
    let image = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    let attribution = document.createElement("details");
    let attributionSummary = document.createElement("summary");
    let name = document.createElement("h2");
    let address = document.createElement("address");
    let description = document.createElement("p");
    let learnMore = document.createElement("a");

    // Grid container for the responsive name/photo/description/location layout
    placeGrid.classList.add("place-grid");

    // Build the image and its attribution caption (hidden behind a toggle until requested)
    image.setAttribute("src", `images/${place.image}`);
    image.setAttribute("alt", place.title);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "300");
    image.setAttribute("height", "200");
    attributionSummary.textContent = "Photo credit";
    attribution.appendChild(attributionSummary);
    attribution.append(place.attribution);
    figcaption.appendChild(attribution);
    figure.appendChild(image);
    figure.appendChild(figcaption);

    // Build the h2 content to show the place name
    name.textContent = place.title;

    // Build the address and description
    address.textContent = place.address;
    description.textContent = place.description;

    // Build the Learn More link to the place's official website (not sure if we were supposed to do something with these buttons so I just did this anyway)
    let learnMoreContext = document.createElement("span");

    learnMore.setAttribute("href", place.website);
    learnMore.setAttribute("target", "_blank"); //Opens the website in a new tab
    learnMore.setAttribute("rel", "noopener noreferrer"); //blocks any re-directs from the destination site, it's a cyber security thing
    learnMore.classList.add("cta-button");
    learnMore.textContent = "Learn More ";

    // Visible text stays short; this hidden span gives screen readers and search engines the place name. Had to add this to fix LightHouse DevTools Audit for SEO since the buttons are only labeled learn more. 
    learnMoreContext.classList.add("visually-hidden");
    learnMoreContext.textContent = `about ${place.title}`;
    learnMore.appendChild(learnMoreContext);

    // Append the grid items, then the grid and button, to the section(card)
    placeGrid.appendChild(name);
    placeGrid.appendChild(figure);
    placeGrid.appendChild(description);
    placeGrid.appendChild(address);

    card.appendChild(placeGrid);
    card.appendChild(learnMore);

    placesCards.appendChild(card);
});
