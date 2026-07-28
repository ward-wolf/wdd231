import { buildCard } from "./card-builder.mjs";

// Create variable for URL

const url = "data/students.json";

// Select the spotlight cards container

const spotlightCards = document.querySelector("#spotlight-cards");

// async function to fetch student data

async function getSpotlightData(dataUrl) {
    try {
        const response = await fetch(dataUrl);
        const students = await response.json();

        displaySpotlights(students);
    } catch (error) {
        console.log(error);
        spotlightCards.textContent = "Unable to load student spotlights.";
    }
}

getSpotlightData(url);

// Randomly select 3 students and display their cards

function displaySpotlights(students) {
    const chosen = students.sort(() => Math.random() - 0.5).slice(0, 3);

    chosen.forEach((student) => {
        const card = buildCard({
            headingLevel: "h3",
            headingText: student.name,
            topImage: { src: student.image, alt: student.name },
            topCaption: `<strong>${student.country}</strong>`,
            bodyLines: [
                `<strong>FROM:</strong> ${student.oldJob}`,
                `<strong>TO:</strong> ${student.newJob}`,
                `"${student.review}"`,
            ],
        });

        spotlightCards.appendChild(card);
    });
}
