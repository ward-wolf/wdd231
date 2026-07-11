// Create variable for URL

const url = "data/members.json";

// Create cards

const cards = document.querySelector("#cards");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// async function to fetch member data

async function getMemberData(dataUrl) {
    const response = await fetch(dataUrl);
    const data = await response.json();

    displayGrid(data.members);
    setActiveButton(gridButton);

    gridButton.addEventListener("click", () => {
        displayGrid(data.members);
        setActiveButton(gridButton);
    });
    listButton.addEventListener("click", () => {
        displayList(data.members);
        setActiveButton(listButton);
    });
}

getMemberData(url);

// Highlight whichever view button is active

function setActiveButton(activeButton) {
    [gridButton, listButton].forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}

// Function to display members in grid format

const displayGrid = (members) => {
    cards.innerHTML = "";
    cards.classList.remove("list-view");
    cards.classList.add("grid-view");

    members.forEach((member) => {
        // Create elements to add to the div.cards element
        let card = document.createElement("section");
        let top = document.createElement("div");
        let image = document.createElement("img");
        let tagline = document.createElement("p");
        let name = document.createElement("h2");
        let divider = document.createElement("hr");
        let email = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("p");

        // Build the image by setting all the relevant attributes
        image.setAttribute("src", `images/${member.image}`);
        image.setAttribute("alt", `${member.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "80");
        image.setAttribute("height", "80");

        // Build the tagline paragraph, placed beside the image
        tagline.classList.add("tagline");
        tagline.textContent = `${member.tagline}`;
        top.classList.add("top");
        top.appendChild(image);
        top.appendChild(tagline);

        // Build the h2 content to show the business name
        name.textContent = `${member.name}`;

        // Build the business info paragraphs, each on its own line
        email.innerHTML = `<strong>EMAIL:</strong> ${member.email}`;
        phone.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
        website.innerHTML = `<strong>URL:</strong> ${member.website}`;

        // Append the section(card) with the created elements
        card.appendChild(top);
        card.appendChild(name);
        card.appendChild(divider);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
}

// Function to display members in list format

const displayList = (members) => {
    cards.innerHTML = "";
    cards.classList.remove("grid-view");
    cards.classList.add("list-view");

    members.forEach((member) => {
        // Create elements to add to the div.cards element
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("p");

        // Build the h2 content to show the business name
        name.textContent = `${member.name}`;

        // Build the business info paragraphs, one per column
        address.classList.add("address");
        address.textContent = `${member.address}`;
        phone.classList.add("phone");
        phone.textContent = `${member.phone}`;
        website.classList.add("website");
        website.textContent = `${member.website}`;

        // Append the section(card) with the created elements
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
}
