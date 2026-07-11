// Create variable for URL

const url = "data/members.json";

// Select the spotlight cards container

const spotlightCards = document.querySelector("#spotlight-cards");

// async function to fetch member data

async function getSpotlightData(dataUrl) {
    try {
        const response = await fetch(dataUrl);
        const data = await response.json();

        displaySpotlights(data.members);
    } catch (error) {
        console.log(error);
        spotlightCards.textContent = "Unable to load business spotlights.";
    }
}

getSpotlightData(url);

// Randomly select 3 gold or silver members and display their cards

function displaySpotlights(members) {
    const eligible = members.filter((member) => member.membership === 2 || member.membership === 3);
    const chosen = eligible.sort(() => Math.random() - 0.5).slice(0, 3);
    const membershipLabels = { 2: "Silver", 3: "Gold" };

    chosen.forEach((member) => {
        // Create elements to add to the div.spotlight-cards element
        let card = document.createElement("section");
        let top = document.createElement("div");
        let image = document.createElement("img");
        let membershipLevel = document.createElement("p");
        let name = document.createElement("h3");
        let divider = document.createElement("hr");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("p");

        // Build the image by setting all the relevant attributes
        image.setAttribute("src", `images/${member.image}`);
        image.setAttribute("alt", `${member.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "80");
        image.setAttribute("height", "80");

        // Build the membership level paragraph, placed beside the image
        membershipLevel.classList.add("tagline");
        membershipLevel.innerHTML = `<strong>${membershipLabels[member.membership]} Member</strong>`;
        top.classList.add("top");
        top.appendChild(image);
        top.appendChild(membershipLevel);

        // Build the h3 content to show the business name
        name.textContent = `${member.name}`;

        // Build the business info paragraphs, each on its own line
        address.innerHTML = `<strong>ADDRESS:</strong> ${member.address}`;
        phone.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
        website.innerHTML = `<strong>URL:</strong> ${member.website}`;

        // Append the section(card) with the created elements
        card.appendChild(top);
        card.appendChild(name);
        card.appendChild(divider);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        spotlightCards.appendChild(card);
    });
}
