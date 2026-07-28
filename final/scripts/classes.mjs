import { buildCard } from "./card-builder.mjs";

// Create variables for the data file URLs

const classesUrl = "data/classes.json";
const tracksUrl = "data/program-tracks.json";

// Create cards

const cards = document.querySelector("#cards");
const reviewDialog = document.querySelector("#review-dialog");

const trackButtons = {
    all: document.querySelector("#all"),
    cs: document.querySelector("#cs"),
    ai: document.querySelector("#ai"),
    ml: document.querySelector("#ml"),
    qc: document.querySelector("#qc"),
};

// Map each track button (except "all") to the matching track name used in program-tracks.json

const trackNames = {
    cs: "Computer Science",
    ai: "Artificial Intelligence",
    ml: "Machine Learning",
    qc: "Quantum Computing",
};

// Remember which track button was last selected

const lastTrackKey = "nta-last-track";

// async function to fetch class and program track data

async function getCourseData(classesDataUrl, tracksDataUrl) {
    try {
        const classesResponse = await fetch(classesDataUrl);
        const classes = await classesResponse.json();

        const tracksResponse = await fetch(tracksDataUrl);
        const programTracks = await tracksResponse.json();

        const classesByCode = {};
        classes.forEach((course) => {
            classesByCode[course.code] = course;
        });

        function selectTrack(key) {
            const courseList = key === "all"
                ? classes
                : programTracks[trackNames[key]].map((code) => classesByCode[code]);

            displayCourses(courseList);
            setActiveButton(trackButtons[key]);
            localStorage.setItem(lastTrackKey, key);
        }

        Object.keys(trackButtons).forEach((key) => {
            trackButtons[key].addEventListener("click", () => selectTrack(key));
        });

        const savedTrack = localStorage.getItem(lastTrackKey);
        selectTrack(trackButtons[savedTrack] ? savedTrack : "all");
    } catch (error) {
        console.log(error);
        cards.textContent = "Unable to load classes.";
    }
}

getCourseData(classesUrl, tracksUrl);

// Highlight whichever track button is active

function setActiveButton(activeButton) {
    Object.values(trackButtons).forEach((btn) => btn.classList.remove("active"));
    activeButton.classList.add("active");
}

// Function to display a list of courses, in order, as cards

function displayCourses(courseList) {
    cards.innerHTML = "";

    courseList.forEach((course) => {
        const card = buildCard({
            headingLevel: "h2",
            headingText: `${course.code}: ${course.name}`,
            bodyLines: [`<strong>Track:</strong> ${course.track}`, course.description],
            action: {
                label: "Read Student Review",
                className: "review-button",
                ariaLabel: `Read student review for ${course.code}: ${course.name}`,
                onClick: () => showReview(course),
            },
        });

        cards.appendChild(card);
    });
}

// Function to display a course's student review in the dialog

function showReview(course) {
    reviewDialog.innerHTML = "";

    let heading = document.createElement("h2");
    let image = document.createElement("img");
    let comment = document.createElement("p");
    let name = document.createElement("p");
    let closeButton = document.createElement("button");

    heading.textContent = `${course.code}: ${course.name}`;
    heading.setAttribute("id", "review-dialog-heading");
    heading.setAttribute("tabindex", "-1");
    reviewDialog.setAttribute("aria-labelledby", "review-dialog-heading");

    image.setAttribute("src", course.review.image);
    image.setAttribute("alt", course.review.name);
    image.setAttribute("loading", "lazy");

    comment.classList.add("review-comment");
    comment.textContent = `"${course.review.comment}"`;

    name.classList.add("review-name");
    name.innerHTML = `<strong>${course.review.name}</strong>`;

    closeButton.setAttribute("type", "button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        reviewDialog.close();
    });

    reviewDialog.appendChild(heading);
    reviewDialog.appendChild(image);
    reviewDialog.appendChild(comment);
    reviewDialog.appendChild(name);
    reviewDialog.appendChild(closeButton);

    reviewDialog.showModal();
    heading.focus();
    reviewDialog.scrollTop = 0;
}
