// Create variable for URL

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Create cards

const cards = document.querySelector('#cards');

// Async function to fetch data from API

// const fetchData = async () => {
//     try {
//         const response = await fetch(url); // Wait for the fetch to complete
//         const data = await response.json(); // Wait for the response to be converted to JSON
//         //  console.table(data.prophets); // temp test for data response
//         console.log(data); // Output the fetched data
//     }
//     catch (error) {
//         console.error("Error fetching data:", error); // Handle any errors
//     }
// };

// async function to display prophet data

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();

    displayProphets(data.prophets); 
}

getProphetData(url);

// Function to display Prophets

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let portrait = document.createElement('img');

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        // Build the birth date and birth place paragraphs
        birthDate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;
        birthPlace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the section(card) with the created elements
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}
